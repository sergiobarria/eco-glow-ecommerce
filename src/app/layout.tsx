import type { Metadata } from 'next';
import { Jura } from 'next/font/google';

import { cn } from '@/lib/utils';
import './globals.css';

const jura = Jura({ preload: true, subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'EcoGlow',
	description: 'Eco-friendly, sustainable, and affordable candles.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn('antialiased', jura.className)}>{children}</body>
		</html>
	);
}
