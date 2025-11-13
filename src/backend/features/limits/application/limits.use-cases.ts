import {
  countChartsByUserToday,
  countReportsByUserToday,
  countMessagesByUserToday,
} from '../infra/limits.repo';
import {
  DAILY_CHART_LIMIT,
  DAILY_REPORT_LIMIT,
  DAILY_MESSAGE_LIMIT,
  hasExceededLimit,
  type DailyUsage,
} from '../domain/limits.entities';
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
 * Checks if user has exceeded daily chart limit.
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyChartLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const used = await countChartsByUserToday(userId);
  if (hasExceededLimit(used, DAILY_CHART_LIMIT)) {
    throw forbidden(
      `Você já gerou ${DAILY_CHART_LIMIT} mapa${DAILY_CHART_LIMIT > 1 ? 's' : ''} hoje. Tente novamente amanhã!`,
    );
  }
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
    throw forbidden(
      `Você já gerou ${DAILY_REPORT_LIMIT} relatório${DAILY_REPORT_LIMIT > 1 ? 's' : ''} hoje. Tente novamente amanhã!`,
    );
  }
}

/**
 * Checks if user has exceeded daily message limit.
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyMessageLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const used = await countMessagesByUserToday(userId);
  if (hasExceededLimit(used, DAILY_MESSAGE_LIMIT)) {
    throw forbidden(
      `Você já enviou ${DAILY_MESSAGE_LIMIT} mensagens no interpretador hoje. Tente novamente amanhã!`,
    );
  }
}

/**
 * Gets current daily usage for a user.
 * For bypassed users, we fake `used: 0` so UI never blocks.
 */
export async function getDailyUsage(userId: string): Promise<DailyUsage> {
  if (isBypassed(userId)) {
    return {
      charts: { used: 0, limit: DAILY_CHART_LIMIT },
      reports: { used: 0, limit: DAILY_REPORT_LIMIT },
      messages: { used: 0, limit: DAILY_MESSAGE_LIMIT },
    };
  }

  const [chartsUsed, reportsUsed, messagesUsed] = await Promise.all([
    countChartsByUserToday(userId),
    countReportsByUserToday(userId),
    countMessagesByUserToday(userId),
  ]);

  return {
    charts: { used: chartsUsed, limit: DAILY_CHART_LIMIT },
    reports: { used: reportsUsed, limit: DAILY_REPORT_LIMIT },
    messages: { used: messagesUsed, limit: DAILY_MESSAGE_LIMIT },
  };
}
