import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  icon: text("icon"),
  colorScheme: text("color_scheme"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertCategory = typeof categories.$inferInsert
export type SelectCategory = typeof categories.$inferSelect