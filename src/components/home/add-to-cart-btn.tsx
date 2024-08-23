'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddToCartBtnProps {
	className?: string;
}

export function AddToCartBtn({ className }: AddToCartBtnProps) {
	return (
		<Button className={cn(className)} onClick={() => alert('Adding to Cart')}>
			Add To Cart
		</Button>
	);
}
