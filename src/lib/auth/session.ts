import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';

import { lucia, validateRequest } from './lucia';
import { AuthenticationError } from '@/use-cases/errors';

export const getCurrentAuthenticatedUser = cache(async () => {
	const session = await validateRequest();
	if (!session.user) return undefined;

	return session.user;
});

export async function isAuthenticated() {
	const user = await getCurrentAuthenticatedUser();
	if (!user) throw new AuthenticationError();

	return user;
}

export async function setSession(userId: string) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function setBlankSession(sessionId: string) {
	await lucia.invalidateSession(sessionId);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
