import { cn } from '@/lib/utils';

interface AppSectionProps {
	children: React.ReactNode;
	className?: string;
}

export function AppSection({ children, className }: AppSectionProps) {
	return (
		<section className={cn('w-full bg-white pt-8 md:pt-16 lg:pt-24', className)}>
			{children}
		</section>
	);
}
