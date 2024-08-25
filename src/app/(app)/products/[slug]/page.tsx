import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { StarIcon } from 'lucide-react';

import { MaxWidthContainer } from '@/components/site/max-width-container';
import { AddToCartBtn } from '@/components/home/add-to-cart-btn';
import { apiClient } from '@/lib/axios';
import { calculateDiscountPrice, cn, formatCurrency } from '@/lib/utils';
import type { ProductAddon, ProductDetailResponse } from '@/types';
import { ProductImageGallery } from './product-image-gallery';
import { ProductAddons } from './product-addons';
import { env } from '@/lib/env';

async function getProductBySlug(slug: string) {
	const URL = env.API_BASE_URL + '/products/slug/' + slug;
	const { product }: ProductDetailResponse = await fetch(URL, {
		next: { revalidate: 60 * 60 * 24 },
	}).then(res => res.json());

	return product;
}

async function getProductAddons() {
	const data: ProductAddon[] = await fetch(env.API_BASE_URL + '/products/addons', {
		next: { revalidate: 60 * 60 * 24 },
	}).then(res => res.json());

	return data;
}

interface ProductDetailPageProps {
	params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
	const [product, addons] = await Promise.all([
		getProductBySlug(params.slug),
		getProductAddons(),
	]);

	if (!product) notFound();

	const { name, images, description, in_stock, rating, price, discount, review_count, category } =
		product;

	const renderRatingStars = (rating: number) => {
		return Array.from({ length: 5 }).map((_, index) => (
			<StarIcon
				key={index}
				className={cn('size-5', {
					'fill-yellow-400 text-yellow-400': index < Math.floor(rating),
					'half-filled fill-yellow-400 text-yellow-400': index < rating,
					'text-gray-300': index >= rating,
				})}
			/>
		));
	};

	return (
		<>
			<MaxWidthContainer className="py-8">
				<div className="grid gap-8 md:grid-cols-2">
					<ProductImageGallery images={images} productName={name} />
					<div>
						<h1 className="text-3xl font-bold">{name}</h1>

						<p className="mb-4 text-gray-600">{description}</p>
						<div className="mb-2 flex items-center">
							<div
								className="mr-2 flex"
								aria-label={`Rating: ${rating} out of 5 stars`}
							>
								{renderRatingStars(rating)}
							</div>
							<span className="text-sm text-gray-600">({review_count} reviews)</span>
						</div>
						<ProductPrice price={price} discount={discount} />

						<p className="mb-4 text-sm text-gray-500">Category: {category.name}</p>
						<p
							className={cn(
								'mb-4 text-sm font-bold',
								in_stock ? 'text-green-600' : 'text-red-600',
							)}
						>
							{in_stock ? 'In Stock' : 'Out of Stock'}
						</p>

						<ProductAddons addons={addons} />
						<AddToCartBtn product={product} addons={addons} className="w-full" />
					</div>
				</div>
			</MaxWidthContainer>
			<MaxWidthContainer className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
				<p className="text-gray-600">Reviews will be displayed here.</p>
			</MaxWidthContainer>

			<MaxWidthContainer className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
				<p className="text-gray-600">Recommended products will be displayed here.</p>
			</MaxWidthContainer>
		</>
	);
}

function ProductPrice({ price, discount }: { price: number; discount: number | null }) {
	return (
		<div className="flex items-center">
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
