import { countReportsByUserToday } from '../infra/limits.repo';
import { DAILY_REPORT_LIMIT, hasExceededLimit, type DailyUsage } from '../domain/limits.entities';
import { forbidden } from '@/backend/core/errors/http-errors';
import { env } from '@/backend/core/config/env';

// ✅ Read from REPORT_LIMIT_BYPASS_USER_IDS
const BYPASS_USER_IDS: string[] = (env.REPORT_LIMIT_BYPASS_USER_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter((id) => id.length > 0);

function isBypassed(userId: string): boolean {
  return BYPASS_USER_IDS.includes(userId);
}

/**
 * Checks if user has exceeded daily report limit.
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const used = await countReportsByUserToday(userId);
  if (hasExceededLimit(used, DAILY_REPORT_LIMIT)) {
    throw forbidden(`Você já gerou ${DAILY_REPORT_LIMIT} mapas hoje. Tente novamente amanhã!`);
  }
}

/**
 * Gets current daily usage for a user.
 * For bypassed users, we fake `used: 0` so UI never blocks.
 */
export async function getDailyUsage(userId: string): Promise<DailyUsage> {
  if (isBypassed(userId)) {
    return {
      used: 0,
      limit: DAILY_REPORT_LIMIT,
    };
  }

  const used = await countReportsByUserToday(userId);
  return {
    used,
    limit: DAILY_REPORT_LIMIT,
  };
}
