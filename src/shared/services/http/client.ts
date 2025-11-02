import axios from 'axios';
import { supabaseBrowser } from '@/shared/services/supabase-browser';
import { normalizeHttpError } from './error';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor: inject auth token
client.interceptors.request.use(
  async (config) => {
    try {
      const supabase = supabaseBrowser();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      // If getting session fails, continue without token
      console.warn('Failed to get auth session for request:', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: normalize errors
client.interceptors.response.use(
  (r) => r,
  (error) => {
    const normalized = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? error.message,
      data: error.response?.data,
    };
    return Promise.reject(normalizeHttpError(normalized));
  },
);
