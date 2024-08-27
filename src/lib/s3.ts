import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { env } from './env';

export function getS3Client() {
	return new S3Client({
		region: 'auto',
		endpoint: env.CLOUDFLARE_R2_BUCKET_ENDPOINT,
		credentials: {
			accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
			secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
		},
	});
}

export function getImageUrl(imageKey: string) {
	const baseURL = env.CLOUDFLARE_R2_PUBLIC_BASE_URL;
	return `${baseURL}/${imageKey}`;
}
