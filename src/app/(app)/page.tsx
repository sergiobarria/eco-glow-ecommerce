import Image from 'next/image';
import Link from 'next/link';
import { LeafIcon, RecycleIcon, ShoppingBagIcon } from 'lucide-react';

import { ListProducts } from '@/components/home/list-products';
import { AppSection } from '@/components/site/app-section';
import { MaxWidthContainer } from '@/components/site/max-width-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { apiClient } from '@/lib/axios';
import type { ProductListResponse } from '@/types/product';
import { ProductHighlight } from '@/components/home/product-highlight';
import { env } from '@/lib/env';

async function getFeaturedProducts() {
	const URL = env.API_BASE_URL + '/products?is_featured=true&limit=3&offset=0';
	const { items }: ProductListResponse = await fetch(URL, {
		next: { revalidate: 60 * 60 * 24 },
	}).then(res => res.json());

	return items;
}

export default async function Home() {
	const featuredProducts = await getFeaturedProducts();

	return (
		<>
			<section
				id="hero"
				className="relative h-[400px] w-full bg-gray-100 py-12 md:py-24 lg:py-32 xl:py-48"
			>
				<Image src="/hero-1.webp" alt="hero" fill className="object-cover" priority />
				<div className="absolute inset-0 bg-black/50" />
				<MaxWidthContainer className="container absolute inset-0 flex items-center justify-center">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-wider text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
								Illuminate Sustainably
							</h1>
							<p className="mx-auto max-w-[700px] font-light text-gray-200 md:text-xl">
								Discover out collection of eco-friendly candles made from natural
								and recycled materials.
							</p>
						</div>

						{/* CTA Buttons */}
						<div className="space-x-4">
							<Button asChild>
								<Link href="#">Shop Now</Link>
							</Button>
							<Button asChild variant="outline">
								<Link href="#">Learn More</Link>
							</Button>
						</div>
					</div>
				</MaxWidthContainer>
			</section>

			<ProductHighlight />

			<AppSection className="pt-0">
				<MaxWidthContainer className="container">
					<h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Featured Products
					</h2>

					<ListProducts products={featuredProducts} />

					<div className="mt-8 flex justify-center">
						<Button variant="link" asChild>
							<Link href="/products">View All Products</Link>
						</Button>
					</div>
				</MaxWidthContainer>
			</AppSection>

			<AppSection className="w-full">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
						<Image
							src="/hero-2.webp"
							alt="Eco-friendly materials"
							width={500}
							height={300}
							className="mx-auto overflow-hidden rounded-xl object-cover object-center lg:order-last"
							priority
						/>

						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Our Eco-Friendly Materials
								</h2>
								<p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									We&apos;re committed to using only the most sustainable and
									environmentally safe materials in our candles.
								</p>
							</div>
							<ul className="grid gap-2 py-4">
								<li className="flex items-center gap-2">
									<LeafIcon className="h-4 w-4 text-green-600" />
									<span>100% Natural Soy Wax</span>
								</li>
								<li className="flex items-center gap-2">
									<RecycleIcon className="h-4 w-4 text-green-600" />
									<span>Recycled Glass Containers</span>
								</li>
								<li className="flex items-center gap-2">
									<ShoppingBagIcon className="h-4 w-4 text-green-600" />
									<span>Biodegradable Packaging</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</AppSection>

			<AppSection className="w-full bg-background text-foreground">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Join Our Eco-Conscious Community
							</h2>
							<p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Sign up for our newsletter to receive eco-tips, special offers, and
								updates on our latest products.
							</p>
						</div>
						<div className="w-full max-w-sm space-y-2">
							<form className="flex space-x-2">
								<Input
									className="max-w-lg flex-1 bg-white text-gray-900"
									placeholder="Enter your email"
									type="email"
								/>
								<Button type="submit" variant="secondary">
									Subscribe
								</Button>
							</form>
						</div>
					</div>
				</div>
			</AppSection>
		</>
	);
}
