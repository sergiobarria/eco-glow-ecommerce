import {
	FlameIcon,
	HeartIcon,
	LeafIcon,
	RecycleIcon,
	ShoppingBagIcon,
	SunIcon,
} from 'lucide-react';

import { AppSection } from '@/components/site/app-section';
import { MaxWidthContainer } from '../site/max-width-container';

export function ProductHighlight() {
	return (
		<AppSection className="w-full">
			<MaxWidthContainer className="container">
				<h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Why Choose Our Eco-Friendly Candles?
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<LeafIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Sustainable Materials</h3>
						<p className="text-gray-600">
							Our candles are crafted from natural soy wax and essential oils,
							ensuring a clean and eco-friendly burn.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<HeartIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Healthier Living</h3>
						<p className="text-gray-600">
							Free from harmful chemicals, our candles promote better indoor air
							quality and a healthier living environment.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<RecycleIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Recyclable Packaging</h3>
						<p className="text-gray-600">
							Our commitment to sustainability extends to our packaging, which is
							fully recyclable and eco-friendly.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<SunIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Long-Lasting Glow</h3>
						<p className="text-gray-600">
							Enjoy longer burn times and a consistent, beautiful glow throughout the
							life of the candle.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<ShoppingBagIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Made With Love</h3>
						<p className="text-gray-600">
							Each candle is hand-poured with care and attention to detail, ensuring
							quality and consistency
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 rounded-full bg-primary p-3">
							<FlameIcon className="h-6 w-6 text-white" />
						</div>
						<h3 className="mb-2 text-xl font-semibold">Unique Fragrances</h3>
						<p className="text-gray-600">
							Experience a wide range of natural, unique fragrances that enhance your
							mood and living space.
						</p>
					</div>
				</div>
			</MaxWidthContainer>
		</AppSection>
	);
}
