import { z } from 'zod';

export const CreatePaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    method: z.string().min(1, 'Payment method is required'),
    description: z.string().optional(),
    date: z.string().datetime().optional(),
  }),
});

export const UpdatePaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive').optional(),
    method: z.string().min(1, 'Payment method is required').optional(),
    description: z.string().optional(),
    date: z.string().datetime().optional(),
  }),
});
