import 'server-only';

import { eq } from 'drizzle-orm';

import { db } from '@/database';
import { usersTable } from '@/database/schema';
import { getImageUrl } from '@/lib/s3';

export async function getUserByID(id?: string) {
	if (!id) return undefined;
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, id),
		with: { profile: true },
	});
	if (!user) return null;

	return {
		...user,
		profile: {
			...user.profile,
			avatarUrl: getImageUrl(user?.profile?.avatarKey ?? ''),
		},
	};
}

export async function createUserRecord(email: string, passwordHash: string) {
	const result = await db
		.insert(usersTable)
		.values({
			email,
			password: passwordHash,
		})
		.returning({ id: usersTable.id });

	return result.at(0)?.id ?? null;
}

export async function getUserByEmail(email: string) {
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.email, email),
	});

	return user;
}
