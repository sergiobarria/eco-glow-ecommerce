import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {},
	server: {
		DATABASE_URL: z.string(),
		DATABASE_AUTH_TOKEN: z.string(),
		CLOUDFLARE_R2_BUCKET_NAME: z.string(),
		CLOUDFLARE_R2_TOKEN: z.string(),
		CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
		CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
		CLOUDFLARE_R2_BUCKET_ENDPOINT: z.string(),
		CLOUDFLARE_R2_PUBLIC_BASE_URL: z.string(),
	},
	shared: {
		NODE_ENV: z.enum(['development', 'production']).default('development'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
		DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
		CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		CLOUDFLARE_R2_TOKEN: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		CLOUDFLARE_R2_BUCKET_ENDPOINT: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		CLOUDFLARE_R2_PUBLIC_BASE_URL: process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL,
	},
	emptyStringAsUndefined: true,
});
