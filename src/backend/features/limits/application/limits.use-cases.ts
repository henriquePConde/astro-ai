import { countReportsByUserToday } from '../infra/limits.repo';
import { DAILY_REPORT_LIMIT, hasExceededLimit, type DailyUsage } from '../domain/limits.entities';
import { forbidden } from '@/backend/core/errors/http-errors';

/**
 * Checks if user has exceeded daily report limit.
 * Throws if exceeded.
 */
export async function checkDailyLimit(userId: string): Promise<void> {
  const used = await countReportsByUserToday(userId);
  if (hasExceededLimit(used, DAILY_REPORT_LIMIT)) {
    throw forbidden(`Você já gerou ${DAILY_REPORT_LIMIT} mapas hoje. Tente novamente amanhã!`);
  }
}

/**
 * Gets current daily usage for a user.
 */
export async function getDailyUsage(userId: string): Promise<DailyUsage> {
  const used = await countReportsByUserToday(userId);
  return {
    used,
    limit: DAILY_REPORT_LIMIT,
  };
}
