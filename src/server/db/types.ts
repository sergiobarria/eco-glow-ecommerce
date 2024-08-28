import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import * as schema from './schema';

// export const selectImageSchema = createSelectSchema(schema.imagesTable);

// ========== GENERATE TYPES FROM SCHEMA ==========
export type Candle = typeof schema.candlesTable.$inferSelect;
export type Category = typeof schema.categoriesTable.$inferSelect;
export type CandleImage = typeof schema.imagesTable.$inferSelect;
export type Addon = typeof schema.addonsTable.$inferSelect;
export type AddonOption = typeof schema.addonOptionsTable.$inferSelect;
export type AddonWithOption = Omit<Addon, 'created' | 'modified'> & {
	options: Omit<AddonOption, 'created' | 'modified'>[];
};
export type Review = typeof schema.reviewsTable.$inferSelect;
