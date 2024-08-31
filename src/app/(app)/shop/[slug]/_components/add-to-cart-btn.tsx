'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2Icon, ShoppingCartIcon } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type {
	AddonWithOption,
	Candle,
	InsertCartItem,
	InsertCartItemAddon,
} from '@/database/types';
import { addItemToCart } from '../actions';

interface AddToCartBtnProps {
	candle: Candle;
	addons: AddonWithOption[];
	className?: string;
	disabled?: boolean;
}

export function AddToCartBtn({ className, addons, candle, disabled = false }: AddToCartBtnProps) {
	const [totalPrice, setTotalPrice] = useState<number>(candle.price);
	const requiredParams = ['size', 'container', 'wick', 'packaging'];
	const searchParams = useSearchParams();
	const isParamsValid = requiredParams.every(param => searchParams.has(param));
	const { execute, isPending } = useServerAction(addItemToCart, {
		onSuccess: () => {
			toast.success('Item added to cart');
		},
	});

	async function handleAddToCart() {
		// Format the new cart item
		const newCartItem: InsertCartItem = {
			quantity: 1, // TODO: allow user to select quantity (up to 10)
			price: candle.price,
			candleId: candle.id,
		};

		// Get the selected addons from the search params
		const selectedAddons: InsertCartItemAddon[] = addons.map(addon => {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const option = addon.options.find(opt => opt.name === selectedOption);

			return {
				addonId: addon.id,
				addonOptionId: option?.id as string,
			};
		});

		await execute({
			cartItem: newCartItem,
			addons: selectedAddons,
		});
	}

	useEffect(() => {
		// Initialize the total price with the base candle price
		let updatedPrice = candle.price;

		// Add the price modifiers for all selected addons
		for (const addon of addons) {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const selectedAddon = addon.options.find(opt => opt.name === selectedOption);

			if (selectedAddon) {
				updatedPrice += selectedAddon.priceModifier * 100;
			}
		}

		// Update the total price state
		setTotalPrice(updatedPrice);
	}, [searchParams, addons, candle.price]);

	return (
		<>
			<Button
				className={cn('w-full uppercase', className)}
				onClick={handleAddToCart}
				disabled={!isParamsValid || isPending || disabled}
			>
				{isPending ? (
					<Loader2Icon className="size-4 animate-spin" />
				) : (
					<ShoppingCartIcon className="size-4" />
				)}
				<span className="mx-2">Add To Cart</span>
				<span>(Total: ${(totalPrice / 100).toFixed(2)})</span>
			</Button>
			{!isParamsValid && (
				<small className="mt-1 block text-sm italic text-rose-400">
					You must select all options to add to cart
				</small>
			)}
			{disabled && (
				<small className="mt-1 block text-sm italic text-rose-400">
					You must be logged in to add to cart
				</small>
			)}
		</>
	);
}
