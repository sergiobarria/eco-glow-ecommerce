import { cn } from '@/lib/utils';

interface AppSectionProps {
	children: React.ReactNode;
	className?: string;
}

export function AppSection({ children, className }: AppSectionProps) {
	return (
		<section className={cn('w-full bg-white py-12 md:py-24 lg:py-32', className)}>
			{children}
		</section>
	);
}
