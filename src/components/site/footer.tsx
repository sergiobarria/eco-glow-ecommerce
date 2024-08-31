'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlameIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const links = [
	{ label: 'Terms of Service', href: '/terms' },
	{ label: 'Privacy Policy', href: '/privacy-policy' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

export function Footer() {
	const pathname = usePathname();

	return (
		<footer className="mt-auto border-t bg-gray-50">
			<div className="container flex flex-col gap-4 py-8 md:flex-row md:justify-between">
				<div className="flex flex-col gap-1 md:items-start">
					<Link href="/" className="flex items-center justify-center space-x-2">
						<FlameIcon className="size-8 text-rose-500" />
						<span className="text-xl font-bold">EcoGlow</span>
					</Link>
					<p className="text-sm text-gray-500">
						Handcrafted candles made with love and care.
					</p>
				</div>
				<nav className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row">
					{links.map(link => (
						<Link
							key={link.label}
							href={link.href}
							className={cn(
								'text-sm underline-offset-4 hover:underline',
								pathname === link.href ? 'text-gray-800' : 'text-gray-500',
							)}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
			<div className="border-t py-4 text-center text-sm">
				<p>&copy; {new Date().getFullYear()} EcoGlow. All rights reserved.</p>
			</div>
		</footer>
	);
}
