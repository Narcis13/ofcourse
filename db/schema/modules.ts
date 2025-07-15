import {
  pgTable,
  text,
  uuid,
  integer,
  timestamp,
  jsonb
} from "drizzle-orm/pg-core"
import { courses } from "./courses"

export const modules = pgTable("modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),
  orderIndex: integer("order_index").notNull(),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  duration: integer("duration"), // Duration in seconds
  interactiveType: text("interactive_type"), // 'quiz', 'coding_exercise', 'assignment', etc.
  interactiveConfig: jsonb("interactive_config"), // JSON configuration for interactive elements
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertModule = typeof modules.$inferInsert
export type SelectModule = typeof modules.$inferSelect
