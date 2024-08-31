'use server';

import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';
import { z } from 'zod';

import { setSession } from '@/lib/auth/session';
import { registerNewUserUseCase } from '@/use-cases/users';

export const signUpAction = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(8),
		}),
	)
	.handler(async ({ input: { email, password } }) => {
		const user = await registerNewUserUseCase(email, password);
		await setSession(user.id);

		return redirect('/');
	});
