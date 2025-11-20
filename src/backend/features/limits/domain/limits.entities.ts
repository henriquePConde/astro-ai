/**
 * Domain entities and business rules for the limits feature.
 */

export type UsageInfo = {
  used: number;
  limit: number;
  firstGenerationAt?: string; // ISO timestamp of first generation in the last 24 hours
};

export type DailyUsage = {
  charts: UsageInfo;
  reports: UsageInfo;
  messages: UsageInfo;
};

export const DAILY_CHART_LIMIT = 1;
export const DAILY_REPORT_LIMIT = 1;
export const DAILY_MESSAGE_LIMIT = 10;

/**
 * Checks if daily usage has exceeded the limit.
 */
export function hasExceededLimit(used: number, limit: number): boolean {
  return used >= limit;
}
