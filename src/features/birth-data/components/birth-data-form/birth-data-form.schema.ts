import { z } from 'zod';

export const BirthDataFormSchema = z.object({
    name: z.string().min(1, 'Required'),
    year: z.coerce
        .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
        .int()
        .min(1900)
        .max(2100),
    month: z.coerce
        .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
        .int()
        .min(1)
        .max(12),
    day: z.coerce
        .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
        .int()
        .min(1)
        .max(31),
    hour: z.coerce
        .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
        .int()
        .min(0)
        .max(23),
    minute: z.coerce
        .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
        .int()
        .min(0)
        .max(59),
    nation: z.string().optional(),
    city: z.string().optional(),
});

export type BirthDataFormValues = z.infer<typeof BirthDataFormSchema>;


