import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';
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

	// Relationships -> This are DB constraints, not useful for the ORM
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

	// Relationships -> This are DB constraints, not useful for the ORM
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

	// Relationships -> This are DB constraints, not useful for the ORM
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

	// Relationships -> This are DB constraints, not useful for the ORM
	candleId: text('candle_id').references(() => candlesTable.id, { onDelete: 'cascade' }),
})

// ========== ORM RELATIONSHIPS ==========
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

export const addonOptionsRelations = relations(addonOptionsTable, ({ one }) => ({
	addon: one(addonsTable, {
		fields: [addonOptionsTable.addonId],
		references: [addonsTable.id],
	}),
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
