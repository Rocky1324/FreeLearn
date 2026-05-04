import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const chapterVideosTable = pgTable("chapter_videos", {
  id: serial("id").primaryKey(),
  chapterId: text("chapter_id").notNull().unique(),
  youtubeId: text("youtube_id").notNull(),
  setBy: integer("set_by").references(() => usersTable.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
