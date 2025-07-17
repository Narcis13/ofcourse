import {
  pgTable,
  uuid,
  integer,
  timestamp,
  boolean,
  jsonb,
  primaryKey
} from "drizzle-orm/pg-core"
import { modules } from "./modules"
import { courses } from "./courses"

export const progress = pgTable("progress", {
  userId: uuid("user_id").notNull(),
  courseId: uuid("course_id")
    .references(() => courses.id)
    .notNull(),
  moduleId: uuid("module_id")
    .references(() => modules.id)
    .notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent").default(0).notNull(), // Time spent in seconds
  lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(),
  videoProgress: integer("video_progress").default(0).notNull(), // Progress in seconds for video modules
  quizScore: integer("quiz_score"), // Score percentage for quiz modules
  attemptCount: integer("attempt_count").default(0).notNull(), // Number of attempts for interactive modules
  interactionData: jsonb("interaction_data"), // Store specific interaction data (e.g., code submissions, quiz answers)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.moduleId] })
  }
})

export type InsertProgress = typeof progress.$inferInsert
export type SelectProgress = typeof progress.$inferSelect