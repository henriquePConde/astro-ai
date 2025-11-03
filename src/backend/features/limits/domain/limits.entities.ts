/**
 * Domain entities and business rules for the limits feature.
 */

export type DailyUsage = {
  used: number;
  limit: number;
};

export const DAILY_REPORT_LIMIT = 2;

/**
 * Checks if daily usage has exceeded the limit.
 */
export function hasExceededLimit(used: number, limit: number = DAILY_REPORT_LIMIT): boolean {
  return used >= limit;
}
