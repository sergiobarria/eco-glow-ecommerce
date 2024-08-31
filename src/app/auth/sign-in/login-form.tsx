'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerAction } from 'zsa-react';
// import { signupAction } from './actions';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';
import { loginAction } from './actions';

const formSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, 'Password must be at least 8 characters long'),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
	const { isPending, execute, error, isError } = useServerAction(loginAction, {
		onSuccess: () => {
			toast.success('Successfully logged in');
		},
		onError: () => {
			toast.error('Failed to log in');
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(data: FormValues) {
		await execute(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="password" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Link href="/auth/forgot-password" className="block w-full text-right">
					<span className="text-sm hover:underline">Forgot password?</span>
				</Link>

				{isError && <div className="text-sm text-red-500">{error.message}</div>}

				<Button className="mb-3 mt-6 w-full" disabled={isPending}>
					{isPending && (
						<Loader2Icon className="mr-2 inline-block h-5 w-5 animate-spin" />
					)}
					{isPending ? 'Logging in...' : 'Log in'}
				</Button>
			</form>
		</Form>
	);
}
