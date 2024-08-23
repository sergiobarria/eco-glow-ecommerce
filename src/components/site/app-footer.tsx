import Link from 'next/link';

import { MaxWidthContainer } from './max-width-container';

export function AppFooter() {
	return (
		<footer className="mt-12">
			<MaxWidthContainer className="flex w-full flex-col items-center gap-2 border-t py-6 sm:flex-row">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					&copy; {new Date().getFullYear()} EcoGlow Candles. All rights reserved.
				</p>

				<nav className="flex gap-4 sm:ml-auto sm:gap-6">
					<Link className="text-xs underline-offset-4 hover:underline" href="#">
						Terms of Service
					</Link>
					<Link className="text-xs underline-offset-4 hover:underline" href="#">
						Privacy
					</Link>
				</nav>
			</MaxWidthContainer>
		</footer>
	);
}
