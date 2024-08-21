import { z } from 'zod';

const loginUserSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().default('user').optional(),
    photo: z.string().optional(),
  }),
});

export const userValidation = { createUserSchema, loginUserSchema };
