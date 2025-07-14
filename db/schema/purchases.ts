import { pgTable, text, uuid, decimal, timestamp } from "drizzle-orm/pg-core"

export const purchases = pgTable("purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  purchaseType: text("purchase_type").notNull(), // 'course' or 'bundle'
  itemId: uuid("item_id").notNull(),
  pricePaid: decimal("price_paid", { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull()
})

export type InsertPurchase = typeof purchases.$inferInsert
export type SelectPurchase = typeof purchases.$inferSelect