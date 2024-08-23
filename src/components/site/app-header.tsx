'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlameIcon, ShoppingCartIcon, LogInIcon, HomeIcon } from 'lucide-react';

import { MaxWidthContainer } from './max-width-container';
import { cn } from '@/lib/utils';

const links = [
	// { href: '/', label: 'Home', icon: <HomeIcon className="size-4" />, isExact: true },
	{ href: '/cart', label: 'Cart', icon: <ShoppingCartIcon className="size-4" />, isExact: false },
	{ href: '/login', label: 'Login', icon: <LogInIcon className="size-4" />, isExact: false },
];

export function AppHeader() {
	const pathname = usePathname();

	function isActive(href: string, isExact: boolean) {
		if (isExact) return pathname === href;
		return pathname.startsWith(href);
	}

	return (
		<header className="h-20">
			<MaxWidthContainer className="flex items-center">
				<Link href="/" className="flex items-center justify-center">
					<FlameIcon className="size-6 text-amber-500" />
					<span className="ml-1.5 text-xl font-bold">EcoGlow</span>
				</Link>

				<nav className="ml-auto flex gap-4 transition-colors duration-300 sm:gap-6">
					{links.map(({ href, icon, label, isExact }) => (
						<Link
							key={label}
							href={href}
							className={cn(
								'flex items-center',
								isActive(href, isExact)
									? 'text-primary'
									: 'text-slate-600 hover:text-slate-400',
							)}
						>
							<div className="mr-2 shrink-0">{icon}</div>
							<span className="capitalize">{label}</span>
						</Link>
					))}
				</nav>
			</MaxWidthContainer>
		</header>
	);
}
