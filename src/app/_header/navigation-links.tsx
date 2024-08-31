'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface NavigationLinksProps {
	links: { label: string; href: string }[];
}

export function NavigationLinks({ links }: NavigationLinksProps) {
	const pathname = usePathname();

	return (
		<nav className="hidden space-x-6 md:block">
			{links.map(link => (
				<Link
					key={link.label}
					href={link.href}
					className={cn(
						'text-sm uppercase underline-offset-4 hover:underline',
						pathname === link.href
							? 'font-bold text-gray-800 underline underline-offset-4'
							: 'text-gray-500',
					)}
				>
					{link.label}
				</Link>
			))}
		</nav>
	);
}
