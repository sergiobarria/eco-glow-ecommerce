import { CartItemWithDetails } from '@/database/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export function calculateDiscountPrice(price: number, discount: number | null) {
	if (!discount) return price;
	return price - (price * discount) / 100;
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function calculateBasePrice(price: number) {
	return price / 100;
}

export function calculateAddonsPrice(addons: CartItemWithDetails['addons']) {
	return addons.reduce((acc, addon) => {
		const selectedAddonOpt = addon.addon.options.find(opt => opt.id === addon.addonOptionId);
		if (!selectedAddonOpt) return acc;

		return acc + selectedAddonOpt.priceModifier;
	}, 0);
}

export function calculateItemPrice(item: CartItemWithDetails) {
	const basePrice = calculateBasePrice(item.price);
	const addonsPrice = calculateAddonsPrice(item.addons);

	return basePrice + addonsPrice;
}

export function calculateTotalPerItem(item: CartItemWithDetails) {
	const itemPrice = calculateItemPrice(item);
	return itemPrice * item.quantity;
}

export function calculateSubtotal(cartItems: CartItemWithDetails[]) {
	if (!cartItems) return 0;

	return cartItems.reduce((acc, item) => {
		return acc + calculateTotalPerItem(item);
	}, 0);
}
