import { z } from 'zod';

const Env = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(), // only Edge/cron
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1), // server-only

  // Bypass daily report limit for specific users (comma-separated user IDs)
  REPORT_LIMIT_BYPASS_USER_IDS: z.string().optional(),

  // ✅ Enable mock reports (no OpenAI calls) when "true"
  REPORTS_USE_MOCKS: z.string().optional(),
});

export const env = Env.parse(process.env);
