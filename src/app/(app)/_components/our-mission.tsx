import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon, MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MaxWidthContainer } from '@/components/site/max-width-container';

export function OurMission() {
	return (
		<section id="our-mission" className="py-20">
			<MaxWidthContainer>
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
					<div className="space-y-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
							Illuminate Sustainably
						</h2>
						<p className="text-lg text-gray-500">
							At EcoGlow, we believe that lighting up your space shouldn&apos;t come
							at the cost of our planet. Our mission is to create candles that are as
							kind to the environment as they are beautiful in your home.
						</p>
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<FlameIcon className="h-6 w-6 text-amber-500" />
								<p className="text-gray-700">
									100% natural soy wax for a clean, long-lasting burn
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<MoonIcon className="h-6 w-6 text-indigo-500" />
								<p className="text-gray-700">
									Soothing scents crafted from pure essential oils
								</p>
							</div>
							<div className="flex items-center space-x-3">
								<SunIcon className="h-6 w-6 text-yellow-500" />
								<p className="text-gray-700">
									Eco-friendly packaging that&apos;s fully recyclable
								</p>
							</div>
						</div>
						<Button asChild>
							<Link href="/shop">Explore Our Collection</Link>
						</Button>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Image
							src="/highlights-1.webp"
							alt="EcoGlow Candle 1"
							width={250}
							height={250}
							className="rounded-lg bg-gray-200 object-cover shadow-lg"
						/>
						<Image
							src="/highlights-2.webp"
							alt="EcoGlow Candle 2"
							width={250}
							height={250}
							className="mt-8 rounded-lg bg-gray-200 object-cover shadow-lg"
						/>
						<Image
							src="/highlights-3.webp"
							alt="EcoGlow Candle 3"
							width={250}
							height={250}
							className="rounded-lg bg-gray-200 object-cover shadow-lg"
						/>
						<Image
							src="/highlights-4.webp"
							alt="EcoGlow Candle 4"
							width={250}
							height={250}
							className="mt-8 rounded-lg bg-gray-200 object-cover shadow-lg"
						/>
					</div>
				</div>
			</MaxWidthContainer>
		</section>
	);
}
