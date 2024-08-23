import { AppFooter } from '@/components/site/app-footer';
import { AppHeader } from '@/components/site/app-header';

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col">
			<AppHeader />
			<main className="flex-1">{children}</main>
			<AppFooter />
		</div>
	);
}
