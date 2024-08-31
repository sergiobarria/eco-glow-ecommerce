import { AppHeader } from './app-header';
import { Footer } from '@/components/site/footer';
import { getUserProfile } from '@/data-access/profiles';
import { Header } from '@/app/_header';

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const user = await getCurrentAuthenticatedUser();
	// const profile = await getUserProfile(user?.id);

	return (
		<div className="flex min-h-screen flex-col bg-white">
			<Header />
			{/* <AppHeader userProfile={profile} /> */}
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
