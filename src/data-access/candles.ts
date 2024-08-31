import { unstable_cache } from 'next/cache';

import { db } from '@/database';
import { getImageUrl } from '@/lib/s3';
import { TAGS_KEYS } from '@/constants';

export const getFeaturedCandles = unstable_cache(
	async () => {
		const result = await db.query.candlesTable.findMany({
			where: (records, { eq }) => eq(records.isFeatured, true),
			orderBy: (records, { desc }) => [desc(records.created)],
			limit: 3,
			with: {
				images: {
					columns: { imageKey: true },
					limit: 1,
				},
			},
		});

		return result.map(candle => ({
			...candle,
			images: candle.images.map(image => getImageUrl(image.imageKey)),
		}));
	},
	['featured-candles'],
	{
		tags: ['featured-candles'],
		revalidate: 60 * 60, // 1 hour
	},
);

export const getAllCandles = unstable_cache(
	async () => {
		const result = await db.query.candlesTable.findMany({
			orderBy: (records, { desc }) => [desc(records.created)],
			with: {
				images: {
					columns: { imageKey: true },
					limit: 1,
				},
			},
		});

		return result.map(candle => ({
			...candle,
			images: candle.images.map(image => getImageUrl(image.imageKey)),
		}));
	},
	[TAGS_KEYS.CANDLES],
	{
		tags: [TAGS_KEYS.CANDLES],
		revalidate: 60 * 60, // 1 hour
	},
);

export const getCandleBySlug = unstable_cache(
	async (slug: string) => {
		const candle = await db.query.candlesTable.findFirst({
			where: (candles, { eq }) => eq(candles.slug, slug),
			with: {
				category: true,
				images: {
					columns: { imageKey: true },
				},
				reviews: {
					columns: { created: false, modified: false },
				},
			},
		});

		if (!candle) return null;

		return {
			...candle,
			images: candle.images.map(image => getImageUrl(image.imageKey)),
		};
	},
	[TAGS_KEYS.CANDLE_BY_SLUG],
	{
		tags: [TAGS_KEYS.CANDLE_BY_SLUG],
		revalidate: 60 * 60, // 1 hour
	},
);

export const getCandleImages = async (candleId: string, limit = 1) => {
	const images = await db.query.imagesTable.findMany({
		columns: { imageKey: true },
		where: (images, { eq }) => eq(images.candleId, candleId),
		orderBy: (images, { desc }) => [desc(images.created)],
		limit,
	});

	return images.map(image => getImageUrl(image.imageKey));
};
