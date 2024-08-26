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
			// {
			// 	protocol: 'https',
			// 	hostname: '133dcc8e314c1a4add6883375b2e905a.r2.cloudflarestorage.com',
			// 	port: '',
			// 	pathname: '**/*',
			// },
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
