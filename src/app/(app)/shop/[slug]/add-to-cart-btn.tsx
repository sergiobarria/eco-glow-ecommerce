'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AddonWithOption, Candle, NewCartItem, NewCartItemAddon } from '@/database/types';

interface AddToCartBtnProps {
	candle: Candle;
	addons: AddonWithOption[];
	className?: string;
}

export function AddToCartBtn({ className, addons, candle }: AddToCartBtnProps) {
	const [totalPrice, setTotalPrice] = useState<number>(candle.price);
	const requiredParams = ['size', 'container', 'wick', 'packaging'];
	const searchParams = useSearchParams();
	const isParamsValid = requiredParams.every(param => searchParams.has(param));

	function handleAddToCart() {
		// Get or create the cart item

		// Add cart item to the cart
		const newCartItem: NewCartItem = {
			quantity: 1, // TODO: allow user to select quantity (up to 10)
			price: candle.price,
			candleId: candle.id,
		};

		// Get the selected addons from the search params
		const selectedAddons: NewCartItemAddon[] = addons.map(addon => {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const option = addon.options.find(opt => opt.name === selectedOption);

			return {
				addonId: addon.id,
				cartItemId: '1', // TODO: get the cart item ID
				addonOptionId: option?.id as string,
			};
		});

		// TODO: Add the cart item to the store if the user is not logged in, otherwise add to the cart in the database
		alert(JSON.stringify(newCartItem));
	}

	useEffect(() => {
		// Update the total price when the selected addons change
		let updatedPrice = candle.price;

		for (const addon of addons) {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const selectedAddon = addon.options.find(opt => opt.name === selectedOption);

			if (selectedAddon) updatedPrice += selectedAddon.priceModifier;
		}

		setTotalPrice(updatedPrice);
	}, [searchParams, addons, candle.price]);

	return (
		<>
			<Button
				className={cn('w-full uppercase', className)}
				onClick={handleAddToCart}
				disabled={!isParamsValid}
			>
				<ShoppingCartIcon className="size-4" />
				<span className="mx-2">Add To Cart</span>
				<span>(Total: ${(totalPrice / 100).toFixed(2)})</span>
			</Button>
			{!isParamsValid && (
				<small className="mt-1 block text-sm italic text-rose-400">
					You must select all options to add to cart
				</small>
			)}
		</>
	);
}
