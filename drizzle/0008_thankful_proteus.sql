CREATE INDEX `cart_item_id_idx` ON `cart_item_addons` (`cart_item_id`);--> statement-breakpoint
CREATE INDEX `addon_id_idx` ON `cart_item_addons` (`addon_id`);--> statement-breakpoint
CREATE INDEX `addon_option_id_idx` ON `cart_item_addons` (`addon_option_id`);--> statement-breakpoint
CREATE INDEX `cart_id_idx` ON `cart_items` (`cart_id`);--> statement-breakpoint
CREATE INDEX `candle_id_idx` ON `cart_items` (`candle_id`);