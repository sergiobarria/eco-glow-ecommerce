import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
	throw new Error('DATABASE_URL and DATABASE_AUTH_TOKEN must be provided');
}

export default defineConfig({
	schema: 'src/database/schema.ts',
	out: 'drizzle',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		url: DATABASE_URL,
		authToken: DATABASE_AUTH_TOKEN,
	},
});
