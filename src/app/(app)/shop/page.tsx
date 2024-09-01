import Link from 'next/link';
import Image from 'next/image';
import { PlusIcon, StarIcon } from 'lucide-react';

import { MaxWidthContainer } from '@/components/site/max-width-container';
import { Button } from '@/components/ui/button';
import { getAllCandles } from '@/data-access/candles';
import { getAllCategories } from '@/data-access/categories';
import { Candle, Category } from '@/database/types';
import { cn } from '@/lib/utils';
import { SearchBar } from './search-bar';

interface ShopPageProps {
	searchParams?: { [key: string]: string | string[] } | undefined;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
	const search = searchParams?.search as string | undefined;
	const selectedCategory = (searchParams?.category as string) || 'all';
	const [categories, candles] = await Promise.all([
		getAllCategories(),
		getAllCandles(search, selectedCategory),
	]);

	return (
		<MaxWidthContainer className="my-12">
			<h1 className="mb-8 text-3xl font-bold">Shop Our Candles</h1>

			<div className="flex flex-col gap-4 md:flex-row">
				<div className="md:w-1/4">
					<h2 className="mb-4 px-4 text-xl font-semibold">Categories</h2>

					<CategoriesFilters
						categories={categories}
						selectedCategory={selectedCategory}
					/>
				</div>

				<div className="md:w-3/4">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<SearchBar />
						<div>Price Filters</div>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{candles.length === 0 && (
							<div className="col-span-full text-center text-gray-500">
								No candles found
							</div>
						)}
						{candles.map(candle => (
							<CandleCard key={candle.id} candle={candle} />
						))}
					</div>
				</div>
			</div>
		</MaxWidthContainer>
	);
}

function CategoriesFilters({
	categories,
	selectedCategory,
}: {
	categories: Pick<Category, 'id' | 'name'>[];
	selectedCategory: string | undefined;
}) {
	return (
		<div className="flex flex-col space-y-2">
			{categories.map(category => {
				const isActive = category.name.toLowerCase() === selectedCategory?.toLowerCase();
				return (
					<Link
						key={category.id}
						href={category.id === 'all' ? '/shop' : `/shop?category=${category.name}`}
						className={cn(
							'rounded-lg px-4 py-2 text-sm font-semibold',
							isActive ? 'bg-gray-100' : 'text-gray-400 hover:bg-gray-100',
						)}
					>
						{category.name}
					</Link>
				);
			})}
		</div>
	);
}

interface CandleCardProps {
	candle: Candle & { image: string };
}

function CandleCard({ candle }: CandleCardProps) {
	return (
		<div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
			<div className="aspect-square overflow-hidden">
				<Image
					src={candle.image}
					alt={candle.name}
					width={300}
					height={300}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			{/* Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			<div className="absolute inset-x-0 bottom-0 translate-y-full transform p-4 text-white duration-300 group-hover:translate-y-0">
				<h3 className="mb-1 text-lg font-semibold">{candle.name}</h3>
				<p className="mb-2 text-sm opacity-90">{candle.summary.substring(0, 50)}...</p>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<StarIcon className="size-4 fill-current text-yellow-500" />
						<span className="ml-1 text-sm">{candle.rating.toFixed(1)}</span>
					</div>
					<span className="text-lg font-bold">${(candle.price / 100).toFixed(2)}</span>
				</div>
			</div>

			<Button
				asChild
				size="icon"
				className="absolute right-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				aria-label={`See ${candle.name} details`}
			>
				<Link href={`/shop/${candle.slug}`}>
					<PlusIcon className="size-6 text-white" />
				</Link>
			</Button>
		</div>
	);
}
