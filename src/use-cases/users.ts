import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

import { createUserRecord, getUserByEmail } from '@/data-access/users';
import { PublicError } from './errors';
import { hashPassword, verifyPassword } from '@/lib/auth/hash';
import { createUserProfile } from '@/data-access/profiles';

export async function registerNewUserUseCase(email: string, password: string) {
	const existingUser = await getUserByEmail(email);
	if (existingUser) throw new PublicError('An user with this email already exists');

	const passwordHash = await hashPassword(password);
	const userId = await createUserRecord(email, passwordHash);
	if (!userId) throw new PublicError('Failed to create user');

	const username = uniqueNamesGenerator({
		dictionaries: [colors, animals],
		separator: ' ',
		style: 'capital',
	});
	await createUserProfile(userId, username);

	// TODO: Create token and Send email verification email
	// ...

	return { id: userId };
}

export async function loginUserUseCase(email: string, password: string) {
	const existingUser = await getUserByEmail(email);
	if (!existingUser) throw new PublicError('Invalid email or password');

	const validPassword = await verifyPassword(password, existingUser.password);
	if (!validPassword) throw new PublicError('Invalid email or password');

	return { id: existingUser.id };
}
