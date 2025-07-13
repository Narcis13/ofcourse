import { pgTable, text, uuid, decimal, integer, timestamp } from "drizzle-orm/pg-core"
import { categories } from "./categories"

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  subcategory: text("subcategory"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("50.00"),
  instructorId: text("instructor_id").notNull(),
  tags: text("tags").array(),
  prerequisites: text("prerequisites").array(),
  estimatedHours: integer("estimated_hours"),
  thumbnailUrl: text("thumbnail_url"),
  previewVideoUrl: text("preview_video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertCourse = typeof courses.$inferInsert
export type SelectCourse = typeof courses.$inferSelect