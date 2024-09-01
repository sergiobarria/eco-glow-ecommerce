import 'server-only';
import { unstable_cache } from 'next/cache';

import { TAGS_KEYS } from '@/constants';
import { db } from '@/database';

export const getAllCategories = unstable_cache(
	async () => {
		const result = await db.query.categoriesTable.findMany({
			columns: { id: true, name: true },
			orderBy: (records, { asc }) => [asc(records.name)],
		});

		return [{ id: 'all', name: 'All' }, ...result];
	},
	[TAGS_KEYS.CATEGORIES],
	{
		revalidate: 60 * 60 * 24,
		tags: [TAGS_KEYS.CATEGORIES],
	},
);
