import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, LeafIcon, RecycleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AboutPage() {
	return (
		<div className="py-16">
			<section className="clear-start bg-white pb-20">
				<div className="container px-4 md:px-6">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
						<div className="space-y-4">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								Our Story
							</h2>
							<p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								EcoGlow was born from a passion for sustainability and a love for
								cozy, well-lit spaces. Our founder, Jane Doe, started making
								eco-friendly candles in her kitchen, determined to create products
								that were both beautiful and kind to the environment.
							</p>
							<p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								What began as a small, local business has grown into a community of
								like-minded individuals who believe that small changes can make a
								big difference. Today, EcoGlow continues to innovate, always seeking
								new ways to bring light into people&apos;s lives while preserving
								the beauty of our planet.
							</p>
						</div>
						<div className="lg:order-first">
							<Image
								src="/placeholder.jpg"
								alt="EcoGlow founder making candles"
								width={400}
								height={300}
								className="rounded-lg object-cover"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-gray-50 py-20">
				<div className="container px-4 md:px-6">
					<h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Our Values
					</h2>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="flex flex-col items-center text-center">
							<LeafIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
							<p className="text-gray-500">
								We&apos;re committed to using eco-friendly materials and processes
								in every step of our production.
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<RecycleIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Circular Economy</h3>
							<p className="text-gray-500">
								We design our products and packaging with reusability and
								recyclability in mind.
							</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<HeartIcon className="mb-4 h-12 w-12 text-green-500" />
							<h3 className="mb-2 text-xl font-semibold">Community</h3>
							<p className="text-gray-500">
								We believe in fostering a community of environmentally conscious
								consumers and producers.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-white pt-20">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
						<div className="space-y-4">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								Our Commitment
							</h2>
							<p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								At EcoGlow, we&apos;re committed to more than just making beautiful
								candles. We&apos;re dedicated to:
							</p>
							<ul className="space-y-2 text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								<li>• Using 100% natural, biodegradable ingredients</li>
								<li>• Sourcing materials responsibly and ethically</li>
								<li>• Minimizing waste in our production process</li>
								<li>• Supporting environmental conservation efforts</li>
								<li>• Educating our community about sustainable living</li>
							</ul>
							<div className="pt-4">
								<Button asChild>
									<Link href="/shop">Shop Our Products</Link>
								</Button>
							</div>
						</div>
						<div className="container relative h-[400px] w-full border">
							<Image
								src="/hero-2.webp"
								alt="EcoGlow production process"
								className="w-full rounded-lg object-cover"
								fill
							/>

							{/* Image Overlay */}
							<div className="absolute inset-0 rounded-lg bg-black bg-opacity-50" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
