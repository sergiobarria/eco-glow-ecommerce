import Image from 'next/image';

interface CandleDetailsPageProps {
	params: Readonly<{
		slug: string;
	}>;
}

export default function CandleDetailsPage({ params }: CandleDetailsPageProps) {
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
