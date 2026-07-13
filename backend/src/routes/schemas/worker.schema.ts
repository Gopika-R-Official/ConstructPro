import { z } from 'zod';

export const CreateWorkerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    dailyWage: z.number().nonnegative('Daily wage must be a non-negative number'),
    phone: z.string().optional(),
  }),
});

export const CreateWorkerPaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    method: z.string().min(1, 'Method is required'),
    date: z.string().datetime().optional(),
  }),
});
