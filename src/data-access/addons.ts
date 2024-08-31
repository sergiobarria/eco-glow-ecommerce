import { unstable_cache } from 'next/cache';

import { db } from '@/database';
import { TAGS_KEYS } from '@/constants';

export const getAllAddons = unstable_cache(
	async () => {
		const addons = await db.query.addonsTable.findMany({
			columns: { created: false, modified: false },
			with: {
				options: {
					columns: { created: false, modified: false },
					orderBy: (records, { asc }) => [asc(records.order)],
				},
			},
		});

		return addons;
	},
	[TAGS_KEYS.ADDONS],
	{
		tags: [TAGS_KEYS.ADDONS],
		revalidate: 60 * 60 * 24, // 24 hours
	},
);
