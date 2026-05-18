import { Router, Request, Response } from "express";
import { google } from "googleapis";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { requireAuth, AuthRequest } from "../middleware/require-auth";

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

router.get("/events", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }
    const calendar = google.calendar({ version: "v3", auth });
    const { data } = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json({ events: data.items ?? [] });
  } catch (err) {
    console.error("Calendar events error:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des événements." });
  }
});

router.post("/events", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { summary, description, startDate, endDate, allDay } = req.body ?? {};

  if (!summary || !startDate) {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }
    const calendar = google.calendar({ version: "v3", auth });

    const event: any = {
      summary,
      description: description ?? "",
    };

    if (allDay) {
      event.start = { date: startDate };
      event.end = { date: endDate ?? startDate };
    } else {
      event.start = { dateTime: startDate, timeZone: "America/Port-au-Prince" };
      event.end = { dateTime: endDate ?? startDate, timeZone: "America/Port-au-Prince" };
    }

    const { data } = await calendar.events.insert({ calendarId: "primary", requestBody: event });
    res.json({ event: data });
  } catch (err) {
    console.error("Calendar create event error:", err);
    res.status(500).json({ error: "Erreur lors de la création de l'événement." });
  }
});

router.post("/sync-academic", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { events } = req.body ?? {};

  if (!Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: "Aucun événement à synchroniser." });
    return;
  }

  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }
    const calendar = google.calendar({ version: "v3", auth });

    const results = [];
    for (const ev of events) {
      const { data } = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: `[FreeLearn] ${ev.title}`,
          description: `Événement académique FreeLearn Haiti`,
          start: { date: ev.date },
          end: { date: ev.date },
          colorId: ev.type === "exam" ? "11" : ev.type === "holiday" ? "5" : "2",
        },
      });
      results.push(data);
    }

    res.json({ synced: results.length, ok: true });
  } catch (err) {
    console.error("Calendar sync error:", err);
    res.status(500).json({ error: "Erreur lors de la synchronisation." });
  }
});

router.delete("/events/:eventId", requireAuth, async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { eventId } = req.params;

  try {
    const auth = await getAuthClientForUser(userId);
    if (!auth) {
      res.status(403).json({ error: "google_not_connected" });
      return;
    }
    const calendar = google.calendar({ version: "v3", auth });
    await calendar.events.delete({ calendarId: "primary", eventId });
    res.json({ ok: true });
  } catch (err) {
    console.error("Calendar delete event error:", err);
    res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

export default router;
