import { z } from 'zod';

const addProductSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    stockCount: z.number(),
  }),
});

export const productValidation = { addProductSchema };
