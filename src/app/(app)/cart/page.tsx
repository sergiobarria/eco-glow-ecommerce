import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingCartIcon, XIcon } from 'lucide-react';

import { MaxWidthContainer } from '@/components/site/max-width-container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getCheckoutCartDetails } from '@/data-access/carts';
import { CartItemWithDetails } from '@/database/types';
import { getCurrentAuthenticatedUser } from '@/lib/auth/session';
import { calculateItemPrice, calculateSubtotal, calculateTotalPerItem } from '@/lib/utils';
import { SHIPPING_COST, TAXES_PERCENTAGE } from '@/config';

export default async function CartPage() {
	const user = await getCurrentAuthenticatedUser();
	const cart = await getCheckoutCartDetails(user?.id);

	function calculateTotal() {
		const subtotal = calculateSubtotal(cart?.items ?? []);
		const taxes = (TAXES_PERCENTAGE / 100) * (subtotal + SHIPPING_COST);
		const total = subtotal + SHIPPING_COST + taxes;

		return { total, taxes };
	}

	return (
		<MaxWidthContainer className="my-10">
			<h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
			{cart?.items && cart?.items.length === 0 && (
				<div className="py-16 text-center">
					<ShoppingCartIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
					<p className="mb-4 text-xl">Your cart is empty</p>
					<Button asChild>
						<Link href="/shop">Continue Shopping</Link>
					</Button>
				</div>
			)}

			<div className="flex flex-col gap-8 lg:flex-row">
				<div className="space-y-6 lg:w-2/3">
					{cart?.items?.map(item => <CartItem key={item.id} item={item} />)}
				</div>

				<div className="lg:w-1/3">
					<div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
						<h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
						<div className="mb-4 space-y-2">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>${calculateSubtotal(cart?.items ?? []).toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span>${SHIPPING_COST.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Taxes ({TAXES_PERCENTAGE}%)</span>
								<span>${calculateTotal().taxes.toFixed(2)}</span>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="mb-6 flex justify-between text-lg font-bold">
							<span>Total</span>
							<span>${calculateTotal().total.toFixed(2)}</span>
						</div>
						<Button className="w-full" size="lg">
							Proceed to Checkout
							<ArrowRightIcon className="ml-2 h-4 w-4" />
						</Button>

						<Button className="mt-4 w-full" variant="secondary">
							<Link href="/shop">Continue Shopping</Link>
						</Button>
					</div>
				</div>
			</div>
		</MaxWidthContainer>
	);
}

function CartItem({ item }: { item: CartItemWithDetails }) {
	return (
		<div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row">
			<div className="flex-shrink-0">
				<Image
					src={item.candle.images.at(0) as string}
					alt="candle"
					width={100}
					height={100}
					className="rounded-md object-cover"
				/>
			</div>

			<div className="flex-grow">
				<div className="flex items-start justify-between">
					<h2 className="text-lg font-semibold">
						{item.candle.name} - ({item.quantity})
					</h2>
					<Button
						size="icon"
						variant="ghost"
						aria-label={`Remove ${item.candle.name} from cart`}
						// onClick={() => alert('REMOVING ITEM')}
					>
						<XIcon className="size-4" />
					</Button>
				</div>
				<p className="mb-2 flex w-full items-center justify-between text-sm text-gray-600">
					<span>Base Price</span>
					<span>${(item.price / 100).toFixed(2)}</span>
				</p>

				{/* Item Addons */}
				<div className="mb-4 space-y-1">
					{item.addons.map(itemAddons => {
						const selectedAddonOpt = itemAddons.addon.options.find(
							opt => opt.id === itemAddons.addonOptionId,
						);
						const plusPrice =
							selectedAddonOpt?.priceModifier === 0
								? '-'
								: `+${selectedAddonOpt?.priceModifier.toFixed(2)}`;

						return (
							<p
								key={itemAddons.addonId}
								className="flex w-full justify-between text-sm text-gray-500"
							>
								<span>
									{itemAddons.addon.name} - {selectedAddonOpt?.name}
								</span>
								<span>{plusPrice}</span>
							</p>
						);
					})}
				</div>

				{/* Item Total */}
				<div className="flex justify-between text-lg font-bold">
					<p>Price per Unit: ${calculateItemPrice(item).toFixed(2)}</p>
					<span>Total: ${calculateTotalPerItem(item).toFixed(2)}</span>
				</div>
			</div>
		</div>
	);
}
