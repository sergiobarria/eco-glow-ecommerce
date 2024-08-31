import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { calculateDiscountPrice, formatCurrency } from '@/lib/utils';
import { getFeaturedCandles } from '@/data-access/candles';

export async function FeaturedProducts() {
	const featuredCandles = await getFeaturedCandles();

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{featuredCandles.map(product => (
				<div key={product.id} className="flex flex-col items-center">
					<Image
						src={product.images?.at(0) || '/placeholder.jpg'}
						alt={product.name}
						width={200}
						height={200}
						className="rounded-lg bg-gray-200 object-cover"
					/>
					<Link
						href={`/shop/${product.slug}`}
						className="hover:underline hover:underline-offset-2"
					>
						<h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
					</Link>
					<p className="text-center text-sm text-gray-500">
						{product.summary?.substring(0, 75)}...
					</p>

					<div className="mb-4 flex items-center justify-center">
						{product.discount ? (
							<>
								<span className="mr-2 text-lg font-bold text-primary">
									$
									{calculateDiscountPrice(
										product.price / 100,
										product.discount,
									).toFixed(2)}
								</span>
								<span className="text-sm text-gray-500 line-through">
									${product.price.toFixed(2)}
								</span>
								<span className="ml-2 text-sm font-semibold text-destructive">
									{product.discount}% OFF
								</span>
							</>
						) : (
							<span className="text-lg font-bold text-primary">
								{formatCurrency(product.price / 100)}
							</span>
						)}
					</div>

					<Button asChild>
						<Link href={`/shop/${product.slug}`}>View Details</Link>
					</Button>
				</div>
			))}
		</div>
	);
}
