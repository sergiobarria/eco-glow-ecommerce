import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon, HeartIcon, LeafIcon, MoonIcon, RecycleIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FeaturedProducts } from './shop/featured-products';

export default async function HomePage() {
	return (
		<>
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

			<section id="our-mission" className="py-20">
				<div className="container px-4 md:px-6">
					<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								Illuminate Sustainably
							</h2>
							<p className="text-lg text-gray-500">
								At EcoGlow, we believe that lighting up your space shouldn&apos;t
								come at the cost of our planet. Our mission is to create candles
								that are as kind to the environment as they are beautiful in your
								home.
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
				</div>
			</section>

			<section id="featured-products" className="bg-gray-100 py-20">
				<div className="container px-4 lg:px-6">
					<h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Featured Products
					</h2>

					<FeaturedProducts />
				</div>
			</section>

			<section id="environmental benefits" className="bg-white py-20">
				<div className="container px-4 md:px-6">
					<h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Environmental Benefits
					</h2>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="flex flex-col items-center text-center">
							<LeafIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Biodegradable</h3>
							<p className="text-gray-500">
								Our candles and packaging are fully biodegradable, minimizing
								environmental impact.
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<RecycleIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Recyclable Containers</h3>
							<p className="text-gray-500">
								All our containers are made from recycled materials and are fully
								recyclable.
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<HeartIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Clean Air</h3>
							<p className="text-gray-500">
								Our natural ingredients promote cleaner indoor air quality compared
								to traditional candles.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="join-community" className="bg-gray-100 py-20">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Join Our Eco-Conscious Community
						</h2>
						<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Sign up for our newsletter to receive eco-tips, special offers, and
							updates on our latest products.
						</p>
						<div className="w-full max-w-sm space-y-2">
							<form className="flex space-x-2">
								<Input
									className="flex-1"
									placeholder="Enter your email"
									type="email"
								/>
								<Button type="submit">Subscribe</Button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
