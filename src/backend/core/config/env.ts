import { z } from 'zod';

const Env = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  DATABASE_URL: z.string().min(1),
});

export const env = Env.parse(process.env);
