import { calculateDiscountPrice, formatCurrency } from '@/lib/utils';

export function ProductPrice({ price, discount }: { price: number; discount: number | null }) {
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
