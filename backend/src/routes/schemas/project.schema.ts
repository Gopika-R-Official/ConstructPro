import { z } from 'zod';

export const CreateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    clientId: z.string().uuid('Invalid Client ID'),
    status: z.enum(['Active', 'Completed', 'Paused']).optional(),
    budget: z.number().nonnegative('Budget must be a positive number').optional(),
    startDate: z.string().datetime().optional(),
  }),
});

export const UpdateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required').optional(),
    clientId: z.string().uuid('Invalid Client ID').optional(),
    status: z.enum(['Active', 'Completed', 'Paused']).optional(),
    budget: z.number().nonnegative('Budget must be a positive number').optional(),
    startDate: z.string().datetime().optional(),
  }),
});
