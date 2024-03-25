import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { insertProductSchema } from '$lib/schemas/product-schemas';
import { db } from '$lib/db/turso.server';
import {
	products,
	productsVariants,
	productsVariantsOptions,
	productsVariantsTypes
} from '$lib/db/schemas';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(insertProductSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(insertProductSchema));
		console.log('🚀 ~ default: ~ form:', form);
		if (!form.valid) fail(400, { form });

		// save the product to the database
		const result = await db
			.insert(products)
			.values({ ...form.data })
			.returning({ insertedId: products.id });
		console.log('🚀 ~ default: ~ result:', result);

		return { form };
	}
};
