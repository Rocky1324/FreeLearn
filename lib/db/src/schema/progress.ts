import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const chapterProgressTable = pgTable(
  "chapter_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    chapterId: text("chapter_id").notNull(),
    courseId: text("course_id").notNull(),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.chapterId)],
);

export const calendarSessionsTable = pgTable("calendar_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  courseId: text("course_id").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const downloadedCoursesTable = pgTable(
  "downloaded_courses",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    downloadedAt: timestamp("downloaded_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.courseId)],
);

export type ChapterProgress = typeof chapterProgressTable.$inferSelect;
export type CalendarSession = typeof calendarSessionsTable.$inferSelect;
export type DownloadedCourse = typeof downloadedCoursesTable.$inferSelect;
