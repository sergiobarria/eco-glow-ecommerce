import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Validate environment variables
jiti('./src/lib/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.jp',
				port: '',
				pathname: '**/*',
			},
			{
				protocol: 'https',
				hostname: 'pub-e65461e379aa4db89df49a939759d1cd.r2.dev',
				port: '',
				pathname: '**/*',
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
