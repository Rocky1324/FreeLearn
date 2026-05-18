import { Router, Request, Response } from "express";
import { google } from "googleapis";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";
import { Readable } from "node:stream";

const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "https://defa549e-2586-4031-94db-f31ae1bbfd87-00-v5fr9q0zbzr3.picard.replit.dev/api/auth/google/callback";

async function getAuthClientForUser(userId: number) {
  const rows = await db
    .select({
      googleAccessToken: usersTable.googleAccessToken,
      googleRefreshToken: usersTable.googleRefreshToken,
      googleTokenExpiry: usersTable.googleTokenExpiry,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  const userRow = rows[0];
  if (!userRow?.googleAccessToken && !userRow?.googleRefreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials({
    access_token: userRow.googleAccessToken,
    refresh_token: userRow.googleRefreshToken,
    expiry_date: userRow.googleTokenExpiry?.getTime(),
  });

  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      await db.update(usersTable).set({
        googleAccessToken: tokens.access_token,
        googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      }).where(eq(usersTable.id, userId));
    }
  });

  return oauth2Client;
}

async function getOrCreateFreeLearnFolder(drive: any): Promise<string> {
  const { data } = await drive.files.list({
    q: "name='FreeLearn' and mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(id, name)",
    spaces: "drive",
  });

  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }

  const { data: folder } = await drive.files.create({
    requestBody: {
      name: "FreeLearn",
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });

  return folder.id;
}

router.post("/upload-url", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { fileUrl, fileName, mimeType } = req.body ?? {};

  if (!fileUrl || !fileName) {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }

    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      res.status(502).json({ error: "Impossible de récupérer le fichier source." });
      return;
    }

    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    const drive = google.drive({ version: "v3", auth });
    const folderId = await getOrCreateFreeLearnFolder(drive);

    const { data: file } = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: mimeType ?? "application/octet-stream",
        body: stream,
      },
      fields: "id, name, webViewLink",
    });

    res.json({ ok: true, file: { id: file.id, name: file.name, webViewLink: file.webViewLink } });
  } catch (err) {
    console.error("Drive upload error:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi vers Google Drive." });
  }
});

router.post("/upload-blob", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;

  const fileName = req.headers["x-file-name"] as string;
  const mimeType = (req.headers["content-type"] as string) ?? "application/octet-stream";

  if (!fileName) {
    res.status(400).json({ error: "Nom de fichier manquant (x-file-name header)." });
    return;
  }

  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }

    const drive = google.drive({ version: "v3", auth });
    const folderId = await getOrCreateFreeLearnFolder(drive);

    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk as Buffer);
    }
    const buffer = Buffer.concat(chunks);
    const stream = Readable.from(buffer);

    const { data: file } = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: "id, name, webViewLink",
    });

    res.json({ ok: true, file: { id: file.id, name: file.name, webViewLink: file.webViewLink } });
  } catch (err) {
    console.error("Drive blob upload error:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi vers Google Drive." });
  }
});

router.get("/status", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  try {
    const rows = await db
      .select({ googleAccessToken: usersTable.googleAccessToken, googleRefreshToken: usersTable.googleRefreshToken })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);
    const connected = !!(rows[0]?.googleAccessToken || rows[0]?.googleRefreshToken);
    res.json({ connected });
  } catch {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
