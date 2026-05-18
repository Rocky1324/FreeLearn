import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const studySessionsTable = pgTable("study_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  plannedMinutes: integer("planned_minutes").notNull(),
  completedMinutes: integer("completed_minutes").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

export type StudySession = typeof studySessionsTable.$inferSelect;
export type InsertStudySession = typeof studySessionsTable.$inferInsert;
