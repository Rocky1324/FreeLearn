import { pgTable, serial, integer, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const forumCategoryEnum = pgEnum("forum_category", [
  "mathematiques",
  "sciences",
  "francais",
  "histoire",
  "anglais",
  "general",
]);

export const forumPostsTable = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  category: forumCategoryEnum("category").notNull().default("general"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  pinned: boolean("pinned").notNull().default(false),
  solved: boolean("solved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const forumRepliesTable = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => forumPostsTable.id, { onDelete: "cascade" }),
  authorId: integer("author_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  accepted: boolean("accepted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ForumPost = typeof forumPostsTable.$inferSelect;
export type InsertForumPost = typeof forumPostsTable.$inferInsert;
export type ForumReply = typeof forumRepliesTable.$inferSelect;
export type InsertForumReply = typeof forumRepliesTable.$inferInsert;
