import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { SignUpForm } from './sign-up-form';
import Link from 'next/link';

export default async function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center text-2xl font-bold">
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<SignUpForm />
				</CardContent>
				<CardFooter>
					<div className="w-full text-center text-sm text-gray-500">
						Already have an account?{' '}
						<Link href="/auth/sign-in" className="text-primary hover:underline">
							Log in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
