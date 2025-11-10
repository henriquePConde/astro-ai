// src/shared/config/constants.ts

// Public URL of the frontend, used to build absolute URLs for PDF rendering.
// Configure via environment variables in `.env.local`:
// - NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_FRONTEND_URL
// Fallback to empty string (will break absolute URLs if not set, so set one).
export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || '';
