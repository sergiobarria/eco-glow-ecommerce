import Link from 'next/link';
import { LogInIcon, ShoppingCartIcon } from 'lucide-react';

import { Logo } from '@/components/site/logo';
import { getCurrentAuthenticatedUser } from '@/lib/auth/session';
import { NavigationLinks } from './navigation-links';
import { ActionsMenu } from './actions-menu';
import { MobileMenu } from './mobile-menu';
import { getCartItemsCount, getOrCreateUserCart } from '@/data-access/carts';

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Cart', href: '/cart' },
	{ label: 'Sign In', href: '/auth/sign-in' },
];

export async function Header() {
	const user = await getCurrentAuthenticatedUser();
	const isAuthenticated = !!user;

	const desktopLinks = links.filter(link => link.label !== 'Cart' && link.label !== 'Sign In');

	return (
		<header className="top sticky z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Logo />
				<NavigationLinks links={desktopLinks} />

				<div className="hidden items-center space-x-6 md:flex">
					<CartLink />
					{isAuthenticated ? <ActionsMenu /> : <SignInLink />}
				</div>
				<MobileMenu links={links} />
			</div>
		</header>
	);
}

async function CartLink() {
	const user = await getCurrentAuthenticatedUser();
	const cart = await getOrCreateUserCart(user?.id);
	const cartItemsCount = await getCartItemsCount(cart);

	return (
		<Link
			href="/cart"
			className="relative flex items-center justify-center space-x-2 text-sm font-medium uppercase text-gray-500 hover:text-gray-800"
		>
			<ShoppingCartIcon className="size-4" />
			<span className="text-sm font-medium">Cart</span>
			{cartItemsCount > 0 && (
				<span className="absolute -right-3 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
					{cartItemsCount}
				</span>
			)}
		</Link>
	);
}

function SignInLink() {
	return (
		<Link
			href="/auth/sign-in"
			className="relative flex items-center justify-center space-x-2 text-sm font-medium uppercase text-gray-500 hover:text-gray-800"
		>
			<LogInIcon className="size-4" />
			<span className="text-sm font-medium uppercase">Sign In</span>
		</Link>
	);
}
