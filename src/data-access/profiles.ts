import 'server-only';

import { unstable_cache } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/database';
import { profilesTable } from '@/database/schema';
import { getImageUrl } from '@/lib/s3';
import { TAGS_KEYS } from '@/constants';

export const getUserProfile = unstable_cache(
	async (userId?: string) => {
		if (!userId) return undefined;
		const profile = await db.query.profilesTable.findFirst({
			where: eq(profilesTable.userId, userId),
			with: { user: true },
		});
		if (!profile) return undefined;

		return {
			...profile,
			avatarUrl: profile.avatarKey ? getImageUrl(profile.avatarKey) : '',
		};
	},
	[TAGS_KEYS.USER_PROFILE],
	{ tags: [TAGS_KEYS.USER_PROFILE], revalidate: 60 * 60 * 24 },
);

export async function createUserProfile(userId: string, username: string, avatarKey?: string) {
	const [id] = await db
		.insert(profilesTable)
		.values({
			userId,
			username,
			avatarKey,
		})
		.onConflictDoNothing()
		.returning({ id: profilesTable.id });

	return id;
}
