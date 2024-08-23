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
				hostname: 'placehold.co',
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
