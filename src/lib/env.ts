import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
	},
	client: {},
	shared: {
		NODE_ENV: z.enum(['development', 'production']).default('development'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
	},
	emptyStringAsUndefined: true,
});
