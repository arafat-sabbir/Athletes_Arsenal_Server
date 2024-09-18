import { z } from 'zod';

export const createAddressValidation = z.object({
  fullName: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid Email Address' }),
  phone: z.string().min(11, { message: 'Invalid Phone Number' }),
  region: z.string({ message: 'Please select your region' }),
  city: z.string({ message: 'Please select your city' }),
  area: z.string({ message: 'Please select your area' }),
  address: z.string({ message: 'Please enter your address' }),
  buildingNo: z.string({ message: 'Please enter your building number' }),
});

export const AddressValidations = { createAddressValidation };
