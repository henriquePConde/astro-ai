import { z } from 'zod';

export const OtpAuthFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type OtpAuthFormValues = z.infer<typeof OtpAuthFormSchema>;
