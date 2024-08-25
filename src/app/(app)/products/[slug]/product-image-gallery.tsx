'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ProductImage } from '@/types/product';

export function ProductImageGallery({
	images,
	productName,
}: {
	images: ProductImage[];
	productName: string;
}) {
	const [activeImage, setActiveImage] = useState<string>(images?.at(0)?.image ?? '');

	return (
		<div>
			<Image
				src={activeImage}
				alt={productName ?? 'Product Image'}
				width={400}
				height={400}
				className="h-auto w-full rounded-lg bg-gray-100"
				priority
			/>
			{/* DISPLAY ADDITIONAL IMAGES */}
			{images.length > 1 && (
				<div className="mt-4 flex items-center gap-2">
					{images.map(image => (
						<div
							key={image.id}
							className="relative aspect-square size-20 cursor-pointer rounded-lg bg-gray-100"
							onClick={() => setActiveImage(image.image)}
						>
							<Image
								src={image.image}
								alt={image.alt_text ?? 'Product Image' + image.id}
								width={80}
								height={80}
								className={cn(
									'rounded-lg object-cover',
									activeImage === image.image &&
										'ring-2 ring-primary ring-offset-2',
								)}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
