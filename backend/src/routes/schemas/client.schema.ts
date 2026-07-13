import { z } from 'zod';

export const CreateClientSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    company: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const UpdateClientSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required').optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
});
