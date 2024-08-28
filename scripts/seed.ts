import fs from 'node:fs';
import path from 'node:path';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import slugify from 'slugify';
import * as dotenv from 'dotenv';

import { PRODUCTS, CATEGORIES, ADDONS, REVIEWS } from '../data/seed-data';
import { uploadImage } from './upload-images';

import {
	candlesTable,
	categoriesTable,
	addonsTable,
	addonOptionsTable,
	imagesTable,
	reviewsTable,
} from '../src/server/db/schema';

dotenv.config({ path: '.env.local' });

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
	console.error('=> ❌ Missing environment variables');
	process.exit(1);
}

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
const db = drizzle(client);

async function seedCategories() {
	console.log('=> 🌱 Seeding categories...');
	for (const category of CATEGORIES) {
		await db
			.insert(categoriesTable)
			.values({ name: category })
			.returning({ id: categoriesTable.id });
		console.log('=> 🌱 Inserted category: ' + category);
	}
}

async function seedAddons() {
	console.log('=> 🌱 Seeding addons...');
	for (const addon of ADDONS) {
		const result = await db
			.insert(addonsTable)
			.values({ name: addon.name })
			.returning({ id: addonsTable.id });
		console.log('=> 🌱 Inserted addon: ' + addon.name);

		for (const option of addon.options) {
			await db.insert(addonOptionsTable).values({
				name: option.option_name,
				priceModifier: option.price_modifier,
				isDefault: option.is_default,
				order: option.order,
				addonId: result.at(0)?.id,
			});
			console.log('=> 🌱 Inserted addon option: ' + option.option_name);
		}
	}
}

async function seedProducts() {
	console.log('=> 🌱 Seeding products...');
	for (const product of PRODUCTS) {
		const categoryResult = await db
			.select()
			.from(categoriesTable)
			.where(eq(categoriesTable.name, product.category));
		const category = categoryResult.at(0);

		if (!category) throw new Error(`Category not found: ${product.category}`);

		const slug = slugify(product.name, { lower: true });
		const result = await db
			.insert(candlesTable)
			.values({
				name: product.name,
				slug,
				summary: product.summary || product.description,
				description: product.description,
				price: product.price * 100,
				discount: product.discount,
				rating: product.rating,
				reviewCount: product.review_count,
				inStock: product.in_stock,
				isFeatured: product.is_featured,
				categoryId: category.id,
			})
			.returning({ id: candlesTable.id });

		const productId = result.at(0)?.id;
		if (!productId) throw new Error('Failed to insert product');
		console.log('=> 🌱 Inserted product: ' + product.name);

		// Get the product ID from the result and upload the product images
		for (const image of product.images) {
			const filepath = path.join(__dirname, '..', 'data', 'images', image);
			const key = await uploadImage(filepath);

			await db.insert(imagesTable).values({
				imageKey: key,
				candleId: productId,
			});
			console.log('=> ✅ Inserted Image:', key);
		}

		// Insert the product reviews
		const reviews = REVIEWS.filter(review => review.productName === product.name);
		for (const review of reviews) {
			await db.insert(reviewsTable).values({
				customer: review.customer,
				rating: review.rating,
				comment: review.comment,
				date: new Date(review.date).toISOString(),
				candleId: productId,
			});
			console.log('=> ✅ Inserted review:', review.customer);
		}
	}
}

async function deleteExistingData() {
	console.log('=> 🗑️ Deleting existing data...');
	await db.delete(candlesTable);
	await db.delete(categoriesTable);
	await db.delete(addonsTable);
	await db.delete(addonOptionsTable);
	await db.delete(imagesTable);
	await db.delete(reviewsTable);
}

async function main() {
	console.log('=> 🌱 Seeding database...');

	try {
		await deleteExistingData();
		await seedCategories();
		await seedAddons();
		await seedProducts();
	} catch (err: unknown) {
		console.error('=> ❌ Failed to seed database:', err);
		process.exit(1);
	}
}

main();
