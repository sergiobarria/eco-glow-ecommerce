CREATE TABLE `addon_options` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`name` text NOT NULL,
	`price_modifier` integer NOT NULL,
	`is_default` integer DEFAULT false NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`addon_id` text,
	FOREIGN KEY (`addon_id`) REFERENCES `addons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `addons` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `candles` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`discount` integer DEFAULT 0 NOT NULL,
	`rating` integer DEFAULT 0 NOT NULL,
	`reviewCount` integer DEFAULT 0 NOT NULL,
	`in_stock` integer DEFAULT true NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `addon_options_name_unique` ON `addon_options` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `addons_name_unique` ON `addons` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `candles_name_unique` ON `candles` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `candles_slug_unique` ON `candles` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);