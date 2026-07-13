import { z } from 'zod';

export const GetAttendanceSchema = z.object({
  query: z.object({
    date: z.string().datetime({ message: "Date must be a valid ISO string" }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  }),
});

export const UpsertAttendanceSchema = z.object({
  body: z.object({
    date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    records: z.array(z.object({
      workerId: z.string().uuid(),
      status: z.enum(['P', 'H', 'O', 'A']),
    })),
  }),
});
