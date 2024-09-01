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
			<div className="relative max-h-[500px] w-full overflow-hidden">
				<Image
					src={activeImage}
					alt="Candle"
					width={1000}
					height={1000}
					className="h-auto max-h-[500px] w-full rounded-lg bg-gray-100 object-cover"
					priority
					sizes="100vw"
				/>
			</div>

			{/* Additional Image Thumbnails */}
			<div className="mt-4 flex items-center gap-2">
				{images.map((image, idx) => (
					<div
						key={image}
						className="relative aspect-square h-20 w-20 cursor-pointer rounded-lg bg-gray-100"
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
