import {
	Hero,
	OurMission,
	FeaturedProducts,
	EnvironmentalBenefits,
	JoinOurCommunity,
} from './_components';
import { MaxWidthContainer } from '@/components/site/max-width-container';

export default async function HomePage() {
	return (
		<>
			<Hero />
			<OurMission />

			<section id="featured-products" className="bg-gray-100 py-20">
				<MaxWidthContainer>
					<h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Featured Products
					</h2>

					<FeaturedProducts />
				</MaxWidthContainer>
			</section>

			<EnvironmentalBenefits />
			<JoinOurCommunity />
		</>
	);
}
