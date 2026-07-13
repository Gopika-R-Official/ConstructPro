import { z } from 'zod';

export const CreateMaterialSchema = z.object({
  body: z.object({
    type: z.string().min(1, 'Type is required'),
    quantity: z.number().positive('Quantity must be positive'),
    unit: z.string().min(1, 'Unit is required'),
    unitPrice: z.number().nonnegative('Unit price must be non-negative'),
    purchasedDate: z.string().datetime().optional(),
  }),
});

export const CreateMaterialPaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    method: z.string().min(1, 'Method is required'),
    date: z.string().datetime().optional(),
  }),
});
