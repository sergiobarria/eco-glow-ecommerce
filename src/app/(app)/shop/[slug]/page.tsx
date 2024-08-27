import { getCandleBySlug } from '@/server/candles';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface CandleDetailsPageProps {
	params: Readonly<{
		slug: string;
	}>;
}

export default async function CandleDetailsPage({ params }: CandleDetailsPageProps) {
	const candle = await getCandleBySlug(params.slug);
	console.log('🚀 ~ CandleDetailsPage ~ candle:', candle);
	if (!candle) notFound();

	return (
		<div>
			Candle Details Page: {params.slug}
			<Image
				src="https://placehold.jp/150x150.png"
				width={150}
				height={150}
				alt="placehold"
			/>
		</div>
	);
}
