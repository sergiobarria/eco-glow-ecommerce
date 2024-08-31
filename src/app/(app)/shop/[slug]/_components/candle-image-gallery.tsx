'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface CandleDetailsPageProps {
	images: string[];
}

export function CandleImageGallery({ images }: CandleDetailsPageProps) {
	const [activeImage, setActiveImage] = useState<string>(images?.at(0) ?? '');

	return (
		<div>
			<Image
				src={activeImage}
				alt="Candle"
				width={400}
				height={400}
				className="h-auto w-full rounded-lg bg-gray-100"
				priority
			/>

			{/* DISPLAY ADDITIONAL IMAGES THUMBNAILS */}
			<div className="mt-4 flex items-center gap-2">
				{images.map((image, idx) => (
					<div
						key={image}
						className="relative aspect-square size-20 cursor-pointer rounded-lg bg-gray-100"
						onClick={() => setActiveImage(image)}
					>
						<Image
							src={image}
							alt={'Candle ' + idx}
							height={80}
							width={80}
							className={cn(
								'rounded-lg object-cover',
								activeImage === image && 'ring-2 ring-primary ring-offset-2',
							)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
