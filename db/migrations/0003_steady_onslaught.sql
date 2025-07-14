CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"purchase_type" text NOT NULL,
	"item_id" uuid NOT NULL,
	"price_paid" numeric(10, 2) NOT NULL,
	"stripe_payment_intent_id" text NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL
);
