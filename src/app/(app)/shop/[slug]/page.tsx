interface CandleDetailsPageProps {
	params: Readonly<{
		slug: string;
	}>;
}

export default function CandleDetailsPage({ params }: CandleDetailsPageProps) {
	return <div>Candle Details Page: {params.slug}</div>;
}
