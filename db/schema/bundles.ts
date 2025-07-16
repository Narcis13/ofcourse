import {
  pgTable,
  text,
  uuid,
  decimal,
  integer,
  timestamp,
  boolean
} from "drizzle-orm/pg-core"
import { categories } from "./categories"

export const bundles = pgTable("bundles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discountPercentage: integer("discount_percentage").notNull().default(0),
  courseIds: uuid("course_ids").array().notNull().default([]),
  active: boolean("active").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  stripeProductId: text("stripe_product_id"),
  stripePriceId: text("stripe_price_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertBundle = typeof bundles.$inferInsert
export type SelectBundle = typeof bundles.$inferSelect
