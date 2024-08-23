'use client';

import Image from 'next/image';

import { MaxWidthContainer } from '@/components/site/max-width-container';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { AddToCartBtn } from '@/components/home/add-to-cart-btn';
import { calculateDiscountPrice, formatCurrency } from '@/lib/utils';
import { StarIcon } from 'lucide-react';

const TEMP_VARIANTS = [
	{
		name: 'size',
		options: ['Small (4 oz)', 'Medium (8 oz)', 'Large (12 oz)'],
		priceModifier: { 'Small (4 oz)': 0, 'Medium (8 oz)': 5, 'Large (12 oz)': 10 },
	},
	{
		name: 'container',
		options: ['Recycled Glass', 'Bamboo', 'Tin'],
		priceModifier: { 'Recycled Glass': 0, Bamboo: 5, Tin: 10 },
	},
	{
		name: 'wick',
		options: ['Cotton', 'Wooden', 'Hemp'],
		priceModifier: { Cotton: 0, Wooden: 5, Hemp: 10 },
	},
	{
		name: 'packaging',
		options: ['Recycled Paper', 'Biodegradable Plastic', 'Reusable Tin'],
		priceModifier: { 'Recycled Paper': 0, 'Biodegradable Plastic': 5, 'Reusable Tin': 10 },
	},
];

export function ProductDetails({ product }: { product: Product }) {
	const renderRatingStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, index) => (
			<StarIcon
				key={index}
				className={`h-5 w-5 ${
					index < Math.floor(rating)
						? 'fill-yellow-400 text-yellow-400'
						: index < rating
							? 'half-filled fill-yellow-400 text-yellow-400'
							: 'text-gray-300'
				}`}
			/>
		));
	};

	return (
		<MaxWidthContainer className="py-8">
			<div className="grid gap-8 md:grid-cols-2">
				<div>
					<Image
						src="https://placehold.co/600"
						alt={product.name}
						width={400}
						height={400}
						className="h-auto w-full rounded-lg"
						unoptimized // TODO: Remove this in production
					/>
				</div>
				<div>
					<h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
					<div className="mb-2 flex items-center">
						<div
							className="mr-2 flex"
							aria-label={`Rating: ${product.rating} out of 5 stars`}
						>
							{renderRatingStars(product.rating)}
						</div>
						<span className="text-sm text-gray-600">
							({product.review_count} reviews)
						</span>
					</div>
					<p className="mb-4 text-gray-600">{product.description}</p>
					<ProductDiscount price={product.price} discount={product.discount} />
					<p className="mb-4 text-sm text-gray-500">Category: {product.category}</p>
					<p
						className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'} mb-4`}
					>
						{product.in_stock ? 'In Stock' : 'Out of Stock'}
					</p>

					{/* DISPLAY VARIANTS */}
					{TEMP_VARIANTS.map(variant => (
						<div key={variant.name} className="mb-4">
							<h3 className="mb-2 text-lg font-semibold capitalize">
								{variant.name}
							</h3>

							<div className="flex flex-wrap gap-2">
								{variant.options.map(option => (
									<Button
										key={option}
										variant="outline"
										size="sm"
										className="flex-grow sm:flex-grow-0"
									>
										{option}
									</Button>
								))}
							</div>
						</div>
					))}

					<AddToCartBtn className="w-full" />
				</div>
			</div>
		</MaxWidthContainer>
	);
}

function ProductDiscount({ price, discount }: { price: number; discount: number | null }) {
	return (
		<div className="mb-4 flex items-center">
			{discount ? (
				<>
					<span className="mr-2 text-2xl font-bold text-primary">
						${calculateDiscountPrice(price, discount).toFixed(2)}
					</span>
					<span className="text-lg text-gray-500 line-through">${price.toFixed(2)}</span>
					<span className="ml-2 text-2xl font-semibold text-destructive">
						{discount}% OFF
					</span>
				</>
			) : (
				<span className="text-2xl font-bold text-primary">{formatCurrency(price)}</span>
			)}
		</div>
	);
}
