import { z } from 'zod';

export const CreateExpenseSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().optional(),
    date: z.string().datetime().optional(),
  }),
});

export const UpdateExpenseSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    description: z.string().optional(),
    date: z.string().datetime().optional(),
  }),
});
