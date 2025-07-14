-- This file contains all the new table creation statements
-- Run this script manually when your database is available

-- Create bundles table
CREATE TABLE IF NOT EXISTS "bundles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category_id" uuid NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"discount_percentage" integer DEFAULT 0 NOT NULL,
	"course_ids" uuid[] DEFAULT '{}' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key for bundles
ALTER TABLE "bundles" ADD CONSTRAINT "bundles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;

-- Create purchases table
CREATE TABLE IF NOT EXISTS "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"purchase_type" text NOT NULL,
	"item_id" uuid NOT NULL,
	"price_paid" numeric(10, 2) NOT NULL,
	"stripe_payment_intent_id" text NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL
);

-- Create user_courses junction table
CREATE TABLE IF NOT EXISTS "user_courses" (
	"user_id" text NOT NULL,
	"course_id" uuid NOT NULL,
	"granted_via" text NOT NULL,
	"granted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_courses_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);

-- Add foreign key for user_courses
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;

-- Create instructors table
CREATE TABLE IF NOT EXISTS "instructors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"bio" text,
	"expertise" text[] DEFAULT '{}' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"revenue_share" numeric(5, 2) DEFAULT '0.70' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "instructors_user_id_unique" UNIQUE("user_id")
);

-- Create modules table
CREATE TABLE IF NOT EXISTS "modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"title" text NOT NULL,
	"video_url" text,
	"duration" integer,
	"interactive_type" text,
	"interactive_config" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key for modules
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;