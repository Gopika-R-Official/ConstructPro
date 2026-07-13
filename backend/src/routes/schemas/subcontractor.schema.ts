import { z } from 'zod';

export const CreateSubcontractorSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    contractValue: z.number().nonnegative('Contract value must be non-negative'),
  }),
});

export const CreateSubcontractorPaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    method: z.string().min(1, 'Method is required'),
    date: z.string().datetime().optional(),
  }),
});
