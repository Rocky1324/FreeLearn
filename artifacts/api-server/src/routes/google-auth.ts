import { Router } from "express";
import { randomBytes } from "node:crypto";
import { google } from "googleapis";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { usersTable, sessionsTable } from "@workspace/db/schema";
import { createHash } from "node:crypto";

const router = Router();

const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

function getRedirectUri(req: any): string {
  if (process.env.GOOGLE_REDIRECT_URI) return process.env.GOOGLE_REDIRECT_URI;
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  return `${protocol}://${host}/api/auth/google/callback`;
}

function getFrontendUrl(req: any): string {
  if (process.env.FRONTEND_URL) return process.env.FRONTEND_URL;
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "";
  return `${protocol}://${host}`;
}

function getOAuth2Client(redirectUri: string) {
  return new google.auth.OAuth2(GOOGLE_CLIENT_ID!, GOOGLE_CLIENT_SECRET!, redirectUri);
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function setSession(res: any, token: string): void {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("session", token, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: SESSION_MS,
    path: "/",
  });
}

router.get("/google", (req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    res.redirect(`${getFrontendUrl(req)}/connexion?error=google_not_configured`);
    return;
  }
  const redirectUri = getRedirectUri(req);
  const oauth2Client = getOAuth2Client(redirectUri);
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "openid",
      "email",
      "profile",
    ],
  });
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string | undefined;
  const redirectUri = getRedirectUri(req);
  const frontendUrl = getFrontendUrl(req);
  const loginPage = `${frontendUrl}/connexion`;
  const homePage = `${frontendUrl}/`;

  if (!code) {
    res.redirect(`${loginPage}?error=google_no_code`);
    return;
  }

  try {
    const oauth2Client = getOAuth2Client(redirectUri);
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();

    if (!profile.email || !profile.id) {
      res.redirect(`${loginPage}?error=google_no_profile`);
      return;
    }

    const normalizedEmail = profile.email.toLowerCase().trim();
    const displayName = profile.name || profile.email.split("@")[0];
    const tokenExpiry = tokens.expiry_date ? new Date(tokens.expiry_date) : null;

    let user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, profile.id))
      .limit(1)
      .then((r) => r[0] ?? null);

    if (!user) {
      const byEmail = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, normalizedEmail))
        .limit(1)
        .then((r) => r[0] ?? null);

      if (byEmail) {
        const [updated] = await db
          .update(usersTable)
          .set({
            googleId: profile.id,
            googleAccessToken: tokens.access_token ?? null,
            googleRefreshToken: tokens.refresh_token ?? byEmail.googleRefreshToken,
            googleTokenExpiry: tokenExpiry,
            googlePicture: profile.picture ?? null,
          })
          .where(eq(usersTable.id, byEmail.id))
          .returning();
        user = updated;
      } else {
        const [created] = await db
          .insert(usersTable)
          .values({
            email: normalizedEmail,
            displayName,
            passwordHash: null,
            role: "student",
            googleId: profile.id,
            googleAccessToken: tokens.access_token ?? null,
            googleRefreshToken: tokens.refresh_token ?? null,
            googleTokenExpiry: tokenExpiry,
            googlePicture: profile.picture ?? null,
          })
          .returning();
        user = created;
      }
    } else {
      const [updated] = await db
        .update(usersTable)
        .set({
          googleAccessToken: tokens.access_token ?? null,
          googleRefreshToken: tokens.refresh_token ?? user.googleRefreshToken,
          googleTokenExpiry: tokenExpiry,
          googlePicture: profile.picture ?? null,
        })
        .where(eq(usersTable.id, user.id))
        .returning();
      user = updated;
    }

    const token = randomBytes(32).toString("hex");
    await db.insert(sessionsTable).values({
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + SESSION_MS),
    });

    setSession(res, token);
    res.redirect(homePage);
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.redirect(`${loginPage}?error=google_failed`);
  }
});

export default router;
