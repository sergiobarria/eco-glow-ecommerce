import * as schema from './schema';

// ========== GENERATE TYPES FROM SCHEMA ==========
export type Candle = typeof schema.candlesTable.$inferSelect;
export type Category = typeof schema.categoriesTable.$inferSelect;
export type CandleImage = typeof schema.imagesTable.$inferSelect;
export type Addon = typeof schema.addonsTable.$inferSelect;
export type AddonOption = typeof schema.addonOptionsTable.$inferSelect;
export type AddonWithOption = Omit<Addon, 'created' | 'modified'> & {
	options: Omit<AddonOption, 'created' | 'modified'>[];
};
export type Review = typeof schema.reviewsTable.$inferSelect;
export type DBUser = typeof schema.usersTable.$inferSelect;
export type UserProfile = typeof schema.profilesTable.$inferSelect & { avatarUrl: string };
export type UserWithProfile = UserProfile & { user: DBUser };
export type Cart = typeof schema.cartsTable.$inferSelect;
export type CartItem = typeof schema.cartItemsTable.$inferSelect;
export type CartItemAddon = typeof schema.cartItemAddonsTable.$inferSelect;
export type NewCartItem = typeof schema.cartItemsTable.$inferInsert;
export type NewCartItemAddon = typeof schema.cartItemAddonsTable.$inferInsert;

// ========== CUSTOM TYPES ==========
export type InsertCartItem = Pick<NewCartItem, 'quantity' | 'candleId' | 'price'>;
export type InsertCartItemAddon = Pick<NewCartItemAddon, 'addonId' | 'addonOptionId'>;

export interface AddItemToCartInput {
	cartItem: InsertCartItem;
	addons: InsertCartItemAddon[];
}

// Custom type for the candle with selected fields
export type CartCandle = Pick<Candle, 'id' | 'name' | 'price'> & {
	images: string[];
};

// Custom type for cart item addons with selected fields
export type CartItemAddonWithDetails = Pick<CartItemAddon, 'addonId' | 'addonOptionId'> & {
	addon: Pick<Addon, 'id' | 'name'> & {
		options: Pick<AddonOption, 'id' | 'name' | 'priceModifier'>[];
	};
};

// Custom type for cart item with candle and addons details
export interface CartItemWithDetails extends Pick<CartItem, 'id' | 'quantity' | 'price'> {
	candle: CartCandle;
	addons: CartItemAddonWithDetails[];
}

// Custom type for cart with items and their details
export interface CartWithDetails extends Pick<Cart, 'id' | 'created' | 'modified' | 'userId'> {
	items: CartItemWithDetails[];
}
