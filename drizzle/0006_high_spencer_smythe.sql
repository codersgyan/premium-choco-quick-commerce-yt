ALTER TABLE "orders" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "type" varchar(6) DEFAULT 'quick';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "product_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "qty" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
