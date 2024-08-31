import Link from 'next/link';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { LoginForm } from './login-form';

export default async function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 lg:px-6">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center text-2xl font-bold">
						Log in to your account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details below to log in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<LoginForm />
				</CardContent>
				<CardFooter>
					<div className="w-full text-center text-sm text-gray-500">
						Don&apos;t have an account?{' '}
						<Link
							href="/auth/register"
							className="ml-1 font-semibold text-primary hover:underline"
						>
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
