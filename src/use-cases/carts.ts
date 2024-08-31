import 'server-only';

import { getCurrentAuthenticatedUser } from '@/lib/auth/session';
import {
	createCartItem,
	createCartItemAddons,
	getUserCartDetails,
	updateCartItemQuantity,
} from '@/data-access/carts';
import { AddItemToCartInput, InsertCartItem, InsertCartItemAddon } from '@/database/types';
import { AuthenticationError, PublicError } from './errors';

export async function addItemToCartUseCase({ cartItem, addons }: AddItemToCartInput) {
	const user = await getCurrentAuthenticatedUser();
	if (!user) throw new AuthenticationError();

	const cart = await getUserCartDetails(user.id);
	if (!cart) throw new PublicError('Cart not found');

	// If the cart is empty, add the item directly
	if (cart.items.length === 0) {
		return await addCartItemWithAddons(cart.id, cartItem, addons);
	}

	// Compare the new item with all existing items in the cart
	for (const existingCartItem of cart.items) {
		if (
			existingCartItem.candleId === cartItem.candleId &&
			areAddonsIdentical(existingCartItem.addons, addons)
		) {
			await updateCartItemQuantity(
				existingCartItem.id,
				existingCartItem.quantity + cartItem.quantity,
			);
			return cart.id;
		}
	}

	// No matching item was found, so add the new item
	return await addCartItemWithAddons(cart.id, cartItem, addons);
}

async function addCartItemWithAddons(
	cartId: string,
	cartItem: InsertCartItem,
	addons: InsertCartItemAddon[],
) {
	const cartItemId = await createCartItem({ ...cartItem, cartId });
	await createCartItemAddons(addons.map(addon => ({ ...addon, cartItemId })));
	return cartId;
}

function areAddonsIdentical(
	existingCartItemAddons: InsertCartItemAddon[],
	newAddons: InsertCartItemAddon[],
): boolean {
	if (existingCartItemAddons.length !== newAddons.length) return false;

	const existingItemAddons = new Set(
		existingCartItemAddons.map(addon => `${addon.addonId}-${addon.addonOptionId}`),
	);
	return newAddons.every(addon =>
		existingItemAddons.has(`${addon.addonId}-${addon.addonOptionId}`),
	);
}
