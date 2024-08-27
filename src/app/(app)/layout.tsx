import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-white">
			<AppHeader />
			<main className="flex-1">{children}</main>
			<AppFooter />
		</div>
	);
}
