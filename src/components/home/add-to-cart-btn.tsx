'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingCartIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Product, ProductAddon, CartItem, SelectedAddon } from '@/types';

interface AddToCartBtnProps {
	product: Product;
	addons: Omit<ProductAddon, 'created' | 'modified'>[];
	className?: string;
}

export function AddToCartBtn({ className, addons, product }: AddToCartBtnProps) {
	const [totalPrice, setTotalPrice] = useState<number>(product.price);
	const requiredParams = ['size', 'container', 'wick', 'packaging'];
	const searchParams = useSearchParams();
	const isParamsValid = requiredParams.every(param => searchParams.has(param));

	function handleAddToCart() {
		// Determine the selected addons
		const selectedAddons: SelectedAddon[] = addons.map(addon => {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const option = addon.options.find(opt => opt.option_name === selectedOption);

			return {
				addon: addon.name,
				optionId: option?.id as number,
				optionName: option?.option_name as string,
				priceModifier: option?.price_modifier as number,
			};
		});

		// create cart item object
		const newCartItem: CartItem = {
			productId: product.id,
			name: product.name,
			basePrice: product.price,
			totalPrice,
			quantity: 1, // TODO: allow user to select quantity (up to 10)
			selectedAddons,
		};

		// TODO: Add the cart item to the cart
		console.log('Add to cart:', newCartItem);
	}

	useEffect(() => {
		let updatedPrice = product.price;

		for (const addon of addons) {
			const selectedOption = searchParams.get(addon.name.toLowerCase());
			const selectedAddon = addon.options.find(opt => opt.option_name === selectedOption);

			if (selectedAddon) updatedPrice += selectedAddon.price_modifier;
		}

		setTotalPrice(updatedPrice);
	}, [searchParams]);

	return (
		<>
			<Button
				className={cn('uppercase', className)}
				onClick={handleAddToCart}
				disabled={!isParamsValid}
			>
				<ShoppingCartIcon className="mr-2 size-4" />
				<span className="mx-2">Add To Cart</span>
				<span>(Total: ${totalPrice.toFixed(2)})</span>
			</Button>
			{!isParamsValid && (
				<small className="mt-1 block text-sm italic text-rose-400">
					You must select all options to add to cart
				</small>
			)}
		</>
	);
}
