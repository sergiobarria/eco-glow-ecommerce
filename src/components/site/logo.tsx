import Link from 'next/link';
import { FlameIcon } from 'lucide-react';

export function Logo() {
	return (
		<Link href="/" className="flex items-center justify-center space-x-2">
			<FlameIcon className="size-8 text-rose-500" />
			<span className="text-xl font-bold">EcoGlow</span>
		</Link>
	);
}
