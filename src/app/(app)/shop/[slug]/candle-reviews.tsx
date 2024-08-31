import { StarIcon } from 'lucide-react';

import type { Review } from '@/database/types';
import { cn, formatDate } from '@/lib/utils';

interface CandleReviewsProps {
	reviews: Omit<Review, 'created' | 'modified'>[];
}

export function CandleReviews({ reviews }: CandleReviewsProps) {
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
		<div className="mt-12">
			<h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
			{reviews.length === 0 && (
				<p className="text-gray-600">No reviews yet for this product.</p>
			)}

			<div>
				{reviews.map(review => (
					<div key={review.id} className="border-b py-8">
						<div className="mb-2 flex items-center justify-between">
							<span>{review.customer}</span>
							<span className="text-gray-600">{formatDate(review.date)}</span>
						</div>
						<div className="flex items-center">
							<div className="flex items-center gap-1">
								{renderRatingStars(review.rating)}
							</div>
						</div>
						<p>{review.comment}</p>
					</div>
				))}
			</div>
		</div>
	);
}
