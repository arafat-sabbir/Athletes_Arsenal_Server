import { z } from 'zod';

const addProductSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z.string().refine(
      (val) => !isNaN(Number(val)),
      { message: 'Price must be a number' }
    ),
    category: z.string({ required_error: 'Category is required' }),
    vendor: z.string({ required_error: 'Vendor is required' }),
    stockCount: z.string({ required_error: 'Stock count is required' }).refine((val)=>!isNaN(Number(val)), { message: 'Stock count must be a number' }),
    thumbnail: z.string({ required_error: 'Thumbnail is required' }),
    productImages: z.array(z.string()).min(1, {
      message: 'At least one product image is required',
    }),
  }),
});

export const productValidation = { addProductSchema };
