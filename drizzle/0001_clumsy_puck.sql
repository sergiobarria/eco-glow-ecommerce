CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`image_key` text NOT NULL,
	`candle_id` text,
	FOREIGN KEY (`candle_id`) REFERENCES `candles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `images_image_key_unique` ON `images` (`image_key`);