import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	basePrice: real('base_price').notNull(),

	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const productsVariants = sqliteTable('products_variants', {
	id: integer('id').primaryKey(),
	productId: integer('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	variantTypeId: integer('variant_type_id')
		.notNull()
		.references(() => productsVariantsTypes.id, { onDelete: 'cascade' }),
	optionId: integer('option_id')
		.notNull()
		.references(() => productsVariantsOptions.id, { onDelete: 'cascade' }),

	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const productsVariantsTypes = sqliteTable('products_variants_types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),

	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const productsVariantsOptions = sqliteTable('products_variants_options', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	additionalPrice: real('additional_price').notNull(),
	variantTypeId: integer('variant_type_id')
		.notNull()
		.references(() => productsVariantsTypes.id, { onDelete: 'cascade' }),

	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});
