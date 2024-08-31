export class PublicError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'PublicError';
	}
}

export class AuthenticationError extends PublicError {
	constructor() {
		super('You must be logged in to perform this action');
		this.name = 'AuthenticationError';
	}
}

export class NotFoundError extends PublicError {
	constructor() {
		super('Resource Not found');
		this.name = 'NotFoundError';
	}
}

export class LoginError extends PublicError {
	constructor() {
		super('Invalid email or password');
		this.name = 'LoginError';
	}
}
