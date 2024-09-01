import Link from 'next/link';
import { ArrowLeftIcon, ShoppingBagIcon, StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

import {
	CandleAddons,
	ProductPrice,
	AddToCartBtn,
	CandleReviews,
	CandleImageGallery,
} from './_components';
import { Button } from '@/components/ui/button';
import { getAllAddons } from '@/data-access/addons';
import { getCandleBySlug } from '@/data-access/candles';
import { cn } from '@/lib/utils';
import { getCurrentAuthenticatedUser } from '@/lib/auth/session';
import { MaxWidthContainer } from '@/components/site/max-width-container';

interface CandleDetailsPageProps {
	params: Readonly<{
		slug: string;
	}>;
}

export default async function CandleDetailsPage({ params }: CandleDetailsPageProps) {
	const user = await getCurrentAuthenticatedUser();
	const [candle, addons] = await Promise.all([getCandleBySlug(params.slug), getAllAddons()]);
	if (!candle) notFound();

	const { name, images, description, inStock, rating, price, discount, reviewCount, category } =
		candle;

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
		<MaxWidthContainer className="my-8">
			<Button asChild variant="link" className="mb-4">
				<Link
					href="/shop"
					className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
				>
					<ArrowLeftIcon className="size-4" />
					<span>Return to Shop</span>
				</Link>
			</Button>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<CandleImageGallery images={images} />
				<div>
					<h1 className="text-3xl font-bold">{name}</h1>

					<p className="mb-4 text-gray-600">{description}</p>
					<div className="mb-2 flex items-center">
						<div
							className="mr-2 flex items-center"
							aria-label={`Rating: ${rating} out of 5 stars`}
						>
							{renderRatingStars(rating)}
							<small className="ml-2">
								{rating} ({reviewCount} reviews)
							</small>
						</div>
					</div>
					<ProductPrice price={price} discount={discount} />
					<div className="flex items-center gap-8">
						<p className="text-gray-600">
							<strong>Category:</strong> {category?.name}
						</p>
						<span
							className={cn(
								'text-sm font-bold',
								inStock ? 'text-green-600' : 'text-red-600',
							)}
						>
							{inStock ? 'In Stock' : 'Out of Stock'}
						</span>
					</div>
					<hr className="my-4 border-gray-300" />
					<CandleAddons addons={addons} />
					<AddToCartBtn candle={candle} addons={addons} disabled={!user?.id} />
					<Button asChild className="mt-4 w-full" variant="secondary">
						<Link href="/cart" className="space-x-2">
							<ShoppingBagIcon className="size-4" />
							<span>Go to Checkout</span>
						</Link>
					</Button>
				</div>
			</div>
			<CandleReviews reviews={candle.reviews} />
			<div className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
				<p className="text-gray-600">Recommended Products will be displayed here.</p>
			</div>
		</MaxWidthContainer>
	);
}
