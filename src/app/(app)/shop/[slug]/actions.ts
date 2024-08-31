'use server';

import { createServerAction } from 'zsa';

import { addItemToCartUseCase } from '@/use-cases/carts';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { TAGS_KEYS } from '@/constants';

const newCartItemAddonSchema = z.object({
	addonId: z.string(),
	cartItemId: z.string().optional(),
	addonOptionId: z.string(),
});

const newCartITemSchema = z.object({
	candleId: z.string(),
	quantity: z.number().min(1),
	price: z.number(),
});

export const addItemToCart = createServerAction()
	.input(
		z.object({
			cartItem: newCartITemSchema,
			addons: z.array(newCartItemAddonSchema),
		}),
	)
	.handler(async ({ input }) => {
		await addItemToCartUseCase({ cartItem: input.cartItem, addons: input.addons });

		revalidateTag(TAGS_KEYS.CART_ITEMS_COUNT);
		revalidateTag(TAGS_KEYS.CART_DETAILS);
	});
