'use client';

import { useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

import { signUpAction } from './actions';
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

const formSchema = z
	.object({
		email: z.string({ required_error: 'Email is required' }).email(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, 'Password must be at least 8 characters long'),
		passwordConfirmation: z
			.string({ required_error: 'Password confirmation is required' })
			.min(8, 'Password confirmation must be at least 8 characters long'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation'],
	});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
	const { isPending, execute } = useServerAction(signUpAction, {
		onError: () => {
			toast.error('An error occurred while creating your account');
		},
		onSuccess: () => {
			toast.success('Your account has been successfully created');
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			passwordConfirmation: '',
		},
	});

	async function onSubmit(formValues: FormValues) {
		const [, err] = await execute(formValues);
		if (err) {
			console.error('Error creating account:', err);
			return;
		}

		form.reset();
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

				<FormField
					control={form.control}
					name="passwordConfirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password confirmation</FormLabel>
							<FormControl>
								<Input placeholder="password" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="mb-3 mt-6 w-full" disabled={isPending}>
					{isPending && (
						<Loader2Icon className="mr-2 inline-block h-5 w-5 animate-spin" />
					)}
					{isPending ? 'Creating account...' : 'Create account'}
				</Button>
			</form>
		</Form>
	);
}
