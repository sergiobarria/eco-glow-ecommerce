'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		// e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const searchInput = form.search as HTMLInputElement;

		const newParams = new URLSearchParams(searchParams.toString());

		if (searchInput.value) {
			newParams.set('search', searchInput.value);
		} else {
			newParams.delete('search');
		}

		router.push(`/shop${newParams.toString() ? `?${newParams.toString()}` : ''}`);
	}

	function handleDeleteSearch() {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete('search');
		router.push('/shop' + (newParams.toString() ? '?' + newParams.toString() : ''));
	}

	return (
		<form onSubmit={onSubmit} className="flex w-full max-w-[600px] items-center gap-4">
			<div className="relative flex-grow">
				<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
				<Input
					type="text"
					name="search"
					autoComplete="off"
					className="w-full pl-10"
					placeholder="Search candles..."
					defaultValue={searchParams.get('search') || ''}
				/>
				<XIcon
					onClick={handleDeleteSearch}
					className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-400"
				/>
			</div>

			<div className="flex gap-3">
				<Button type="submit">Search</Button>
				<Button type="button" variant="link" className="px-0" onClick={handleDeleteSearch}>
					Clear Search
				</Button>
			</div>
		</form>
	);
}
