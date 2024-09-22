import { z } from 'zod';

const addNewOrderSchema = z.object({
  body: z.object({
    address: z.string({ required_error: 'Address is required' }),
    product: z.string({ required_error: 'Product is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }),
    amount: z.number({ required_error: 'Amount is required' }),
  }),
});

export const OrderValidations = {addNewOrderSchema}
