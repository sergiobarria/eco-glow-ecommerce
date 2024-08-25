'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ProductAddon } from '@/types/product';

interface ProductAddonsProps {
	addons: Omit<ProductAddon, 'created' | 'modified'>[];
}

export function ProductAddons({ addons }: ProductAddonsProps) {
	const searchParams = useSearchParams();

	function getSelectedOption(addonName: string) {
		return searchParams.get(addonName.toLowerCase());
	}

	function createURLWithParams(addonName: string, optionName: string) {
		const params = new URLSearchParams(searchParams.toString());
		params.set(addonName.toLowerCase(), optionName);
		return `?${params.toString()}`;
	}

	return (
		<>
			{addons.map(addon => {
				const selectedOption = getSelectedOption(addon.name);
				const orderedOptions = addon.options.sort((a, b) => a.order - b.order);

				return (
					<div key={addon.name} className="mb-4">
						<h3 className="mb-2 text-lg font-bold capitalize">{addon.name}</h3>

						<div className="flex flex-wrap gap-2">
							{orderedOptions.map(option => (
								<Link
									href={createURLWithParams(addon.name, option.option_name)}
									key={option.id}
									className={cn(
										'flex-grow rounded-lg border border-black px-2 py-1 sm:flex-grow-0',
										selectedOption === option.option_name &&
											'border-none bg-primary text-white',
									)}
									scroll={false}
									replace={true}
								>
									<span className="text-xs">{option.option_name}</span>
									<small className="ml-2">
										(+{option.price_modifier.toFixed(2)})
									</small>
								</Link>
							))}
						</div>
					</div>
				);
			})}
		</>
	);
}
