import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, int, integer, index } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const categoriesTable = sqliteTable('categories', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	name: text('name').notNull().unique(),
});

export const candlesTable = sqliteTable('candles', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	summary: text('summary').notNull(),
	description: text('description'),
	price: int('price').notNull(),
	discount: int('discount').notNull().default(0),
	rating: int('rating').notNull().default(0),
	reviewCount: int('review_count').notNull().default(0),
	inStock: int('in_stock', { mode: 'boolean' }).notNull().default(true),
	isFeatured: int('is_featured', { mode: 'boolean' }).notNull().default(false),

	// Relationships
	categoryId: text('category_id').references(() => categoriesTable.id, { onDelete: 'cascade' }),
});

export const addonsTable = sqliteTable('addons', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	name: text('name').notNull().unique(),
});

export const addonOptionsTable = sqliteTable('addon_options', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	name: text('name').notNull().unique(),
	priceModifier: int('price_modifier').notNull(),
	isDefault: int('is_default', { mode: 'boolean' }).notNull().default(false),
	order: int('order').notNull().default(0),

	// Relationships
	addonId: text('addon_id').references(() => addonsTable.id, { onDelete: 'cascade' }),
});

export const imagesTable = sqliteTable('images', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	imageKey: text('image_key').notNull().unique(),

	// Relationships
	candleId: text('candle_id').references(() => candlesTable.id, { onDelete: 'cascade' }),
});

export const reviewsTable = sqliteTable('reviews', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	customer: text('customer').notNull(),
	rating: int('rating').notNull(),
	comment: text('comment').notNull(),
	date: text('date').notNull(),

	// Relationships
	candleId: text('candle_id').references(() => candlesTable.id, { onDelete: 'cascade' }),
});

export const usersTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	emailVerified: int('email_verified', { mode: 'boolean' }).notNull().default(false),
	active: int('active', { mode: 'boolean' }).notNull().default(true),
});

export const profilesTable = sqliteTable('profiles', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	username: text('username').notNull().unique(),
	avatarKey: text('avatar_key'),

	// Relationships
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(),
	expiresAt: integer('expires_at').notNull(),

	// Relationships
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),
});

export const cartsTable = sqliteTable('carts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	created: text('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	modified: text('modified'),

	// Relationships
	userId: text('customer_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const cartItemsTable = sqliteTable(
	'cart_items',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => createId()),
		created: text('created')
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		modified: text('modified'),

		quantity: int('quantity').notNull(),
		price: int('price').notNull(),

		// Relationships
		cartId: text('cart_id')
			.notNull()
			.references(() => cartsTable.id, { onDelete: 'cascade' }),
		candleId: text('candle_id')
			.notNull()
			.references(() => candlesTable.id, { onDelete: 'cascade' }),
	},
	table => {
		return {
			cartIdIdx: index('cart_id_idx').on(table.cartId),
			candleIdIdx: index('candle_id_idx').on(table.candleId),
		};
	},
);

export const cartItemAddonsTable = sqliteTable(
	'cart_item_addons',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => createId()),
		created: text('created')
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		modified: text('modified'),

		// Relationships
		cartItemId: text('cart_item_id')
			.notNull()
			.references(() => cartItemsTable.id, {
				onDelete: 'cascade',
			}),
		addonId: text('addon_id')
			.notNull()
			.references(() => addonsTable.id, { onDelete: 'cascade' }),
		addonOptionId: text('addon_option_id')
			.notNull()
			.references(() => addonOptionsTable.id, {
				onDelete: 'cascade',
			}),
	},
	table => {
		return {
			cartItemIdIdx: index('cart_item_id_idx').on(table.cartItemId),
			addonIdIdx: index('addon_id_idx').on(table.addonId),
			addonOptionIdIdx: index('addon_option_id_idx').on(table.addonOptionId),
		};
	},
);

/**
 * Tables relations definition for the ORM
 * This is used to define the relationships between tables
 */
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
	candles: many(candlesTable),
}));

export const candlesRelations = relations(candlesTable, ({ one, many }) => ({
	category: one(categoriesTable, {
		fields: [candlesTable.categoryId],
		references: [categoriesTable.id],
	}),
	images: many(imagesTable),
	reviews: many(reviewsTable),
}));

export const addonsRelations = relations(addonsTable, ({ many }) => ({
	options: many(addonOptionsTable),
}));

export const addonOptionsRelations = relations(addonOptionsTable, ({ one, many }) => ({
	addon: one(addonsTable, {
		fields: [addonOptionsTable.addonId],
		references: [addonsTable.id],
	}),
	addons: many(cartItemAddonsTable),
}));

export const imagesRelations = relations(imagesTable, ({ one }) => ({
	candle: one(candlesTable, {
		fields: [imagesTable.candleId],
		references: [candlesTable.id],
	}),
}));

export const reviewsRelations = relations(reviewsTable, ({ one }) => ({
	candle: one(candlesTable, {
		fields: [reviewsTable.candleId],
		references: [candlesTable.id],
	}),
}));

export const usersRelations = relations(usersTable, ({ one }) => ({
	profile: one(profilesTable),
}));

export const profilesRelations = relations(profilesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [profilesTable.userId],
		references: [usersTable.id],
	}),
}));

export const cartsRelations = relations(cartsTable, ({ one, many }) => ({
	user: one(usersTable),
	items: many(cartItemsTable),
}));

export const cartItemsRelations = relations(cartItemsTable, ({ one, many }) => ({
	cart: one(cartsTable, {
		fields: [cartItemsTable.cartId],
		references: [cartsTable.id],
	}),
	candle: one(candlesTable, {
		fields: [cartItemsTable.candleId],
		references: [candlesTable.id],
	}),
	addons: many(cartItemAddonsTable),
}));

export const cartItemAddonsRelations = relations(cartItemAddonsTable, ({ one }) => ({
	cartItem: one(cartItemsTable, {
		fields: [cartItemAddonsTable.cartItemId],
		references: [cartItemsTable.id],
	}),
	addon: one(addonsTable, {
		fields: [cartItemAddonsTable.addonId],
		references: [addonsTable.id],
	}),
	option: one(addonOptionsTable, {
		fields: [cartItemAddonsTable.addonOptionId],
		references: [addonOptionsTable.id],
	}),
}));
