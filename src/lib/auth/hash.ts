import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(passwordString: string) {
	const passwordHash = await hash(passwordString, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	return passwordHash;
}

export async function verifyPassword(passwordString: string, passwordHash: string) {
	const validPassword = await verify(passwordHash, passwordString, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	return validPassword;
}
