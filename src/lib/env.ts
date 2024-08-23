import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {},
	client: {},
	shared: {
		NODE_ENV: z.enum(['development', 'production']).default('development'),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
	},
	emptyStringAsUndefined: true,
});
