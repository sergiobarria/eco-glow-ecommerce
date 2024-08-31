'use server';

import { validateRequest } from '@/lib/auth/lucia';
import { setBlankSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { createServerAction } from 'zsa';

export const signOutAction = createServerAction().handler(async () => {
	const { session } = await validateRequest();
	if (!session) return redirect('/');

	await setBlankSession(session.id);
	return redirect('/');
});
