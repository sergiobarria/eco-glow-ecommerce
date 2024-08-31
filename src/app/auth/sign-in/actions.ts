'use server';

import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';
import { z } from 'zod';

import { loginUserUseCase } from '@/use-cases/users';
import { setSession } from '@/lib/auth/session';

export const loginAction = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(8),
		}),
	)
	.handler(async ({ input }) => {
		const user = await loginUserUseCase(input.email, input.password);
		await setSession(user.id);

		return redirect('/');
	});
