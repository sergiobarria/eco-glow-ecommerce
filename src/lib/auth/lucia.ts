import { cache } from 'react';
import { cookies } from 'next/headers';
import { Lucia, type Session, type User } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import { db } from '@/database';
import { usersTable, sessionsTable } from '@/database/schema';
import { env } from '../env';

export interface AuthenticatedUser {
	user: User | null;
	session: Session | null;
}

const adapter = new DrizzleSQLiteAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: attrs => {
		return {
			id: attrs.id,
		};
	},
});

export const validateRequest = cache(async (): Promise<AuthenticatedUser> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return { user: null, session: null };

	const result = await lucia.validateSession(sessionId);
	// Next.js throws when you attempt to set a cookie when rendering a page
	try {
		if (result.session && result.session.fresh) {
			// This is a fresh session, so we need to set the session cookie
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}

		if (!result.session) {
			// The session is invalid, so we need to clear the cookie
			const sessionCoolie = lucia.createBlankSessionCookie();
			cookies().set(sessionCoolie.name, sessionCoolie.value, sessionCoolie.attributes);
		}
	} catch (err: unknown) {
		console.error(err);
	}

	return result;
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			id: string;
		};
	}
}
