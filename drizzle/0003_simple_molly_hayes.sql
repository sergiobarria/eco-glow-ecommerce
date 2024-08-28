CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`modified` text,
	`customer` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`date` text NOT NULL,
	`candle_id` text,
	FOREIGN KEY (`candle_id`) REFERENCES `candles`(`id`) ON UPDATE no action ON DELETE cascade
);
