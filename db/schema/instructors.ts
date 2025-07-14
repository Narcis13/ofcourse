import { pgTable, text, uuid, boolean, decimal, timestamp } from "drizzle-orm/pg-core"

export const instructors = pgTable("instructors", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").unique().notNull(),
  bio: text("bio"),
  expertise: text("expertise").array().notNull().default([]),
  verified: boolean("verified").notNull().default(false),
  revenueShare: decimal("revenue_share", { precision: 5, scale: 2 }).notNull().default("0.70"), // Default 70% to instructor
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertInstructor = typeof instructors.$inferInsert
export type SelectInstructor = typeof instructors.$inferSelect