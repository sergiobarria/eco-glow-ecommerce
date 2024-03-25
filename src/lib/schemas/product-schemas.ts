import { z } from 'zod';

// =======================================
// ========= Exporting Schemas ============
export const insertProductSchema = z.object({
	name: z
		.string({ required_error: 'Product name is required' })
		.min(3, { message: 'Product name must be at least 3 characters long' }),
	description: z.string({ required_error: 'Product description is required' }).min(10, {
		message: 'Product description must be at least 10 characters long'
	}),
	basePrice: z.coerce.number({ required_error: 'Product base price is required' }).positive()
});

// =======================================
// ========= Exporting Types ============
export type InsertProduct = typeof insertProductSchema;
