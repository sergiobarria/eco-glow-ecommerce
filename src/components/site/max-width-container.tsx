import { cn } from '@/lib/utils';

interface MaxWidthContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function MaxWidthContainer({ children, className }: MaxWidthContainerProps) {
	return (
		<div
			className={cn(
				'container mx-auto h-full w-full max-w-screen-xl px-4 md:px-6',
				className,
			)}
		>
			{children}
		</div>
	);
}
