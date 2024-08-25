import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		API_BASE_URL: z.string().url(),
	},
	client: {},
	shared: {
		NODE_ENV: z.enum(['development', 'production']).default('development'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		API_BASE_URL: process.env.API_BASE_URL,
	},
	emptyStringAsUndefined: true,
});
