import { z } from 'zod';

const addToCartSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
  }),
});

export const cartValidation = { addToCartSchema };
