'use client';

import { cn } from '@/lib/utils';
import { AddonWithOption } from '@/database/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
										'flex-grow rounded-lg border border-black px-2 py-1 sm:flex-grow-0',
										selectedOption === option.name &&
											'border-none bg-primary text-white',
									)}
									scroll={false}
									replace
								>
									<span className="text-xs">{option.name}</span>
									<small className="ml-2">
										(+{option.priceModifier.toFixed(2)})
									</small>
								</Link>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
