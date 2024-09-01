'use client';

import { cn } from '@/lib/utils';
import { AddonWithOption } from '@/database/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CandleAddonProps {
	addons: AddonWithOption[];
}

export function CandleAddons({ addons }: CandleAddonProps) {
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
		<ScrollArea className="h-[400px] w-full rounded-md py-4 pr-6">
			<div>
				{addons.map(addon => {
					const selectedOption = getSelectedOption(addon.name);
					const orderedOptions = addon.options.sort((a, b) => a.order - b.order);

					return (
						<div key={addon.name} className="mb-4">
							<h3 className="mb-2 text-lg font-bold capitalize">{addon.name}</h3>

							<div className="flex flex-wrap gap-2">
								{orderedOptions.map(option => (
									<Link
										href={createURLWithParams(addon.name, option.name)}
										key={option.id}
										className={cn(
											'inline-flex w-full flex-col rounded-lg border border-black p-2 lg:w-[calc(50%-0.5rem)]',
											selectedOption === option.name &&
												'border-none bg-primary text-white',
										)}
										scroll={false}
										replace
									>
										<p className="flex w-full items-center justify-between">
											<span className="font-bold">{option.name}</span>
											<small className="ml-2">
												(+{option.priceModifier.toFixed(2)})
											</small>
										</p>
										<p
											className={cn(
												'block w-full text-sm text-gray-500',
												selectedOption === option.name && 'text-gray-200',
											)}
										>
											Option description here
										</p>
									</Link>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</ScrollArea>
	);
}
