import { calculateDiscountPrice, cn, formatCurrency } from '@/lib/utils';
import { getAllAddons } from '@/data-access/addons';
import { getCandleBySlug } from '@/data-access/candles';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CandleImageGallery } from './candle-image-gallery';
import { CandleAddons } from './candle-addons';
import { AddToCartBtn } from './add-to-cart-btn';
import { CandleReviews } from './candle-reviews';

interface CandleDetailsPageProps {
	params: Readonly<{
		slug: string;
	}>;
}

export default async function CandleDetailsPage({ params }: CandleDetailsPageProps) {
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
		<div className="container mx-auto px-4 py-8 lg:px-6">
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

					<p className="mb-4 text-gray-600">
						<strong>Category:</strong> {category?.name}
					</p>
					<p
						className={cn(
							'mb-4 text-sm font-bold',
							inStock ? 'text-green-600' : 'text-red-600',
						)}
					>
						{inStock ? 'In Stock' : 'Out of Stock'}
					</p>

					<hr className="my-4 border-gray-300" />

					<CandleAddons addons={addons} />
					<AddToCartBtn candle={candle} addons={addons} />
				</div>
			</div>

			<CandleReviews reviews={candle.reviews} />

			<div className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
				<p className="text-gray-600">Recommended Products will be displayed here.</p>
			</div>
		</div>
	);
}

function ProductPrice({ price, discount }: { price: number; discount: number | null }) {
	return (
		<div className="flex items-center">
			{discount ? (
				<>
					<span className="mr-2 text-2xl font-bold text-primary">
						${calculateDiscountPrice(price / 100, discount).toFixed(2)}
					</span>
					<span className="text-lg text-gray-500 line-through">
						${(price / 100).toFixed(2)}
					</span>
					<span className="ml-2 text-2xl font-semibold text-destructive">
						{discount}% OFF
					</span>
				</>
			) : (
				<span className="text-2xl font-bold text-primary">
					{formatCurrency(price / 100)}
				</span>
			)}
		</div>
	);
}
