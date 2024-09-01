import { Footer } from '@/components/site/footer';
import { Header } from '@/app/_header';

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
