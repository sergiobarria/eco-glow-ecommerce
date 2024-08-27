import fs from 'node:fs';
import path from 'node:path';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const {
	CLOUDFLARE_R2_BUCKET_NAME,
	CLOUDFLARE_R2_ACCESS_KEY_ID,
	CLOUDFLARE_R2_SECRET_ACCESS_KEY,
	CLOUDFLARE_R2_BUCKET_ENDPOINT,
} = process.env;

if (
	!CLOUDFLARE_R2_BUCKET_NAME ||
	!CLOUDFLARE_R2_ACCESS_KEY_ID ||
	!CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
	!CLOUDFLARE_R2_BUCKET_ENDPOINT
) {
	console.error('=> ❌ Missing environment variables');
	process.exit(1);
}

const s3 = new S3Client({
	region: 'auto',
	endpoint: CLOUDFLARE_R2_BUCKET_ENDPOINT!,
	credentials: {
		accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID!,
		secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
	},
});

/**
 * @desc: Read all images from <rootDir>data/images and upload them to the S3 bucket (Cloudflare R2)
 */
export async function uploadImage(filepath: string) {
	const content = fs.readFileSync(filepath);
	const fileName = path.basename(filepath, path.extname(filepath));
	const fileExtension = path.extname(filepath);
	const uniqueHash = nanoid(10);
	const newFileName = `${fileName}-${uniqueHash}${fileExtension}`;
	const key = `images/${newFileName}`;

	const command = new PutObjectCommand({
		Bucket: CLOUDFLARE_R2_BUCKET_NAME!,
		Key: key,
		Body: content,
		ContentType: 'image/webp',
	});

	try {
		await s3.send(command);
		return key;
	} catch (err: unknown) {
		console.error('=> ❌ Error uploading image: ' + key);
		throw err;
	}
}
