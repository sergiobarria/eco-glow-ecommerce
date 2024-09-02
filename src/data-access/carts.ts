import 'server-only';

import { unstable_cache } from 'next/cache';
import { eq, sum } from 'drizzle-orm';

import { db } from '@/database';
import { cartsTable, cartItemsTable, cartItemAddonsTable } from '@/database/schema';
import { NewCartItem, NewCartItemAddon } from '@/database/types';
import { getImageUrl } from '@/lib/s3';
import { TAGS_KEYS } from '@/constants';

export const getCheckoutCartDetails = unstable_cache(
	async (userId?: string) => {
		if (!userId) return undefined;

		const cart = await db.query.cartsTable.findFirst({
			where: (records, { eq }) => eq(records.userId, userId),
			with: {
				items: {
					columns: { id: true, quantity: true, price: true },
					with: {
						candle: {
							columns: { id: true, name: true, price: true },
							with: { images: { columns: { imageKey: true }, limit: 1 } },
						},
						addons: {
							with: {
								addon: {
									with: {
										options: {
											columns: { id: true, name: true, priceModifier: true },
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return {
			...cart,
			items: cart?.items.map(item => ({
				...item,
				candle: {
					...item.candle,
					images: item.candle.images.map(image => getImageUrl(image.imageKey)),
				},
			})),
		};
	},
	[TAGS_KEYS.CHECKOUT_CART_DETAILS],
	{
		tags: [TAGS_KEYS.CHECKOUT_CART_DETAILS],
		revalidate: 60 * 60,
	},
);

export const getUserCartDetails = unstable_cache(
	async (userId: string) => {
		const cart = await db.query.cartsTable.findFirst({
			where: (carts, { eq }) => eq(carts.userId, userId),
			with: {
				items: {
					with: { addons: true },
				},
			},
		});

		return cart;
	},
	[TAGS_KEYS.CART_DETAILS],
	{ tags: [TAGS_KEYS.CART_DETAILS], revalidate: 60 * 60 },
);

export const getOrCreateUserCart = unstable_cache(
	async (userId?: string) => {
		if (!userId) return undefined;

		const cart = await db.query.cartsTable.findFirst({
			columns: { id: true },
			where: (carts, { eq }) => eq(carts.userId, userId),
		});
		if (cart) return cart.id;

		const [result] = await db
			.insert(cartsTable)
			.values({ userId })
			.returning({ id: cartsTable.id });

		return result.id;
	},
	[TAGS_KEYS.USER_CART],
	{
		revalidate: 60 * 60 * 24,
		tags: [TAGS_KEYS.USER_CART],
	},
);

export const getCartItemsCount = unstable_cache(
	async (cartId?: string) => {
		if (!cartId) return 0;

		const [result] = await db
			.select({
				count: sum(cartItemsTable.quantity),
			})
			.from(cartItemsTable)
			.where(eq(cartItemsTable.cartId, cartId));

		if (!result.count) return 0;

		return Number(result.count);
	},
	[TAGS_KEYS.CART_ITEMS_COUNT],
	{
		tags: [TAGS_KEYS.CART_ITEMS_COUNT],
		revalidate: 60 * 60 * 24,
	},
);

export const getCartItems = unstable_cache(
	async (cartId: string) => {
		const cartItems = await db.query.cartItemsTable.findMany({
			where: (items, { eq }) => eq(items.cartId, cartId),
			orderBy: (items, { asc }) => [asc(items.created)],
			with: { addons: true },
		});

		return cartItems;
	},
	[TAGS_KEYS.CART_ITEMS],
	{ tags: [TAGS_KEYS.CART_ITEMS], revalidate: 60 * 60 },
);

export const createCartItem = async (cartItem: NewCartItem) => {
	const [result] = await db
		.insert(cartItemsTable)
		.values(cartItem)
		.returning({ id: cartItemsTable.id });

	return result.id;
};

export const createCartItemAddons = async (addons: NewCartItemAddon[]) => {
	const result = await db
		.insert(cartItemAddonsTable)
		.values(addons)
		.returning({ id: cartItemAddonsTable.id });

	return result;
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
	const [result] = await db
		.update(cartItemsTable)
		.set({ quantity })
		.where(eq(cartItemsTable.id, cartItemId))
		.returning({ id: cartItemsTable.id });

	return result.id;
};
