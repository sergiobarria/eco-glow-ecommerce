import type { Metadata } from 'next';
import { Jura } from 'next/font/google';
import './globals.css';

const jura = Jura({ preload: true, subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'EcoGlow E-Commerce',
	description: 'Eco-friendly scented candles for a sustainable future',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={jura.className}>{children}</body>
		</html>
	);
}
