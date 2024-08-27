'use client';

import Link from 'next/link';
import { FlameIcon, LogInIcon, MenuIcon, ShoppingCartIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
];

const actionLinks = [
	{ label: 'Sign In', href: '/sign-in', icon: <LogInIcon className="size-4" /> },
];

interface LinkItem {
	label: string;
	href: string;
	icon?: JSX.Element;
}

interface NavigationLinksProps {
	links: LinkItem[];
	onClick?: () => void;
	className?: string;
}

interface ActionLinksProps {
	links: LinkItem[];
	onClick?: () => void;
	className?: string;
}

interface CartLinkProps {
	itemCount: number;
}

interface MobileMenuProps {
	links: LinkItem[];
	actionLinks: LinkItem[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

function Logo() {
	return (
		<Link href="/" className="flex items-center justify-center space-x-2">
			<FlameIcon className="size-8 text-rose-500" />
			<span className="text-xl font-bold">EcoGlow</span>
		</Link>
	);
}

function NavigationLinks({ links, onClick, className }: NavigationLinksProps) {
	const pathname = usePathname();

	return (
		<nav className={className}>
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
					onClick={onClick}
				>
					{link.label}
				</Link>
			))}
		</nav>
	);
}

function ActionLinks({ links, onClick, className }: ActionLinksProps) {
	const pathname = usePathname();

	return (
		<nav className={cn('space-x-6', className)}>
			{links.map(link => (
				<Link
					key={link.label}
					href={link.href}
					className={cn(
						'flex items-center justify-center space-x-2 text-sm font-medium uppercase',
						pathname === link.href
							? 'text-gray-800'
							: 'text-gray-500 hover:text-gray-800',
					)}
					onClick={onClick}
				>
					{link.icon}
					<span className="text-sm font-medium">{link.label}</span>
				</Link>
			))}
		</nav>
	);
}

function CartLink({ itemCount }: CartLinkProps) {
	return (
		<Link
			href="/cart"
			className="relative flex items-center justify-center space-x-2 text-sm font-medium uppercase text-gray-500 hover:text-gray-800"
		>
			<ShoppingCartIcon className="size-4" />
			<span className="text-sm font-medium">Cart</span>
			{itemCount > 0 && (
				<span className="absolute -right-3 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
					{itemCount}
				</span>
			)}
		</Link>
	);
}

function MobileMenu({ links, actionLinks, open, onOpenChange }: MobileMenuProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetTrigger className="block md:hidden">
				<MenuIcon className="size-6" />
			</SheetTrigger>

			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
					<SheetDescription>Explore our website</SheetDescription>
				</SheetHeader>

				<NavigationLinks
					links={links}
					onClick={() => onOpenChange(false)}
					className="mt-8 flex flex-col items-start space-y-6"
				/>
				<ActionLinks
					links={actionLinks}
					onClick={() => onOpenChange(false)}
					className="mt-12 flex justify-center gap-8"
				/>
			</SheetContent>
		</Sheet>
	);
}

export function AppHeader() {
	const [openSheet, setOpenSheet] = useState<boolean>(false);

	return (
		<header className="top sticky z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Logo />
				<NavigationLinks
					links={links.filter(link => link.label !== 'Home')}
					className="hidden space-x-6 md:block"
				/>
				<div className="hidden items-center space-x-6 md:flex">
					<ActionLinks links={actionLinks} />
					<CartLink itemCount={3} /> {/* TODO: Replace 3 with dynamic cart item count */}
				</div>
				<MobileMenu
					links={links}
					actionLinks={[
						...actionLinks,
						{
							label: 'Cart',
							href: '/cart',
							icon: <ShoppingCartIcon className="size-4" />,
						},
					]}
					open={openSheet}
					onOpenChange={setOpenSheet}
				/>
			</div>
		</header>
	);
}
