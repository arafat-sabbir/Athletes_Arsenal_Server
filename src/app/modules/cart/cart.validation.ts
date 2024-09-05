import { z } from 'zod';

const addToCartSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
  }),
});
const updateQuantitySchema = z.object({
  body: z.object({
    quantity: z.number(),
  }),
});

export const cartValidation = { addToCartSchema ,updateQuantitySchema};
