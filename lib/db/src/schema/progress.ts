import { pgTable, serial, integer, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const userProgressTable = pgTable(
  "user_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    chapterId: text("chapter_id").notNull(),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (table) => ({
    userChapterUnique: uniqueIndex("user_progress_user_chapter_unique").on(
      table.userId,
      table.chapterId,
    ),
  }),
);

export type UserProgress = typeof userProgressTable.$inferSelect;
