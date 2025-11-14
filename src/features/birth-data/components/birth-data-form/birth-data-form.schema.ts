import { z } from 'zod';
import { getDaysInMonth } from './components/date-fields/date-utils';

export const BirthDataFormSchema = z
  .object({
    name: z.string().min(1, 'Required'),
    timeSystem: z.enum(['24h', '12h']).default('24h'),
    amPm: z.enum(['AM', 'PM']).optional(),
    year: z.coerce
      .number({ required_error: 'Required', invalid_type_error: 'Invalid' })
      .int()
      .min(1900, 'Year must be at least 1900')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
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
    nation: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
  })
  .superRefine((val, ctx) => {
    // Conditional hour validation based on time system
    if (val.timeSystem === '12h') {
      if (val.hour < 1 || val.hour > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['hour'],
          message: 'Hour must be between 1 and 12 for 12h format',
        });
      }
      if (!val.amPm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['amPm'],
          message: 'AM/PM is required for 12h format',
        });
      }
    } else {
      if (val.hour < 0 || val.hour > 23) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['hour'],
          message: 'Hour must be between 0 and 23 for 24h format',
        });
      }
    }
    const { year, month, day } = val;
    if (typeof year === 'number' && typeof month === 'number' && typeof day === 'number') {
      const maxDays = getDaysInMonth(year, month);
      if (day > maxDays) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['day'],
          message: `Day must be between 1 and ${maxDays} for the selected month/year`,
        });
      }
    }
  });

export type BirthDataFormValues = z.infer<typeof BirthDataFormSchema>;
