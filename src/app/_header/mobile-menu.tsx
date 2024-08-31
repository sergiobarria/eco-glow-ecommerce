'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
	links: { label: string; href: string }[];
}

export function MobileMenu({ links }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const pathname = usePathname();

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className="block md:hidden">
				<MenuIcon className="size-6" />
			</SheetTrigger>

			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
					<SheetDescription>Explore our website</SheetDescription>
				</SheetHeader>

				<nav className="mt-6 flex flex-col items-start space-y-6">
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
							onClick={() => setIsOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
