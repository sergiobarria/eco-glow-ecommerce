import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Hero() {
	return (
		<section id="hero" className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-20">
			<div className="md:px6 container px-4">
				<div className="flex flex-col items-center space-y-4 text-center">
					<h1 className="text-balance text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						Illuminate Your Space, sustainably.
					</h1>
					<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
						Discover our collection of eco-friendly candles made from natural and
						recycled materials.
					</p>
					<div className="space-x-4">
						<Button asChild>
							<Link href="/shop">Show Now</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/about">Learn More</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
