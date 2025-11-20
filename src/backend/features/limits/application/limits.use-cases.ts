import {
  countChartsByUserToday,
  countReportsByUserToday,
  countMessagesByUserToday,
  getChartsByUserLast24Hours,
  getReportsByUserLast24Hours,
  getMessagesByUserLast24Hours,
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
 * Checks if user has exceeded daily chart limit (24-hour rolling window).
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyChartLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const { count } = await getChartsByUserLast24Hours(userId);
  if (hasExceededLimit(count, DAILY_CHART_LIMIT)) {
    throw forbidden(
      `You have already generated ${DAILY_CHART_LIMIT} chart${DAILY_CHART_LIMIT > 1 ? 's' : ''} in the last 24 hours. Try again later!`,
    );
  }
}

/**
 * Checks if user has exceeded daily report limit (24-hour rolling window).
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const { count } = await getReportsByUserLast24Hours(userId);
  if (hasExceededLimit(count, DAILY_REPORT_LIMIT)) {
    throw forbidden(
      `You have already generated ${DAILY_REPORT_LIMIT} report${DAILY_REPORT_LIMIT > 1 ? 's' : ''} in the last 24 hours. Try again later!`,
    );
  }
}

/**
 * Checks if user has exceeded daily message limit (24-hour rolling window).
 * Users in REPORT_LIMIT_BYPASS_USER_IDS are exempt.
 */
export async function checkDailyMessageLimit(userId: string): Promise<void> {
  if (isBypassed(userId)) {
    return;
  }

  const { count } = await getMessagesByUserLast24Hours(userId);
  if (hasExceededLimit(count, DAILY_MESSAGE_LIMIT)) {
    throw forbidden(
      `You have already sent ${DAILY_MESSAGE_LIMIT} message${DAILY_MESSAGE_LIMIT > 1 ? 's' : ''} in the interpreter in the last 24 hours. Try again later!`,
    );
  }
}

/**
 * Gets current daily usage for a user (24-hour rolling window).
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

  const [chartsData, reportsData, messagesData] = await Promise.all([
    getChartsByUserLast24Hours(userId),
    getReportsByUserLast24Hours(userId),
    getMessagesByUserLast24Hours(userId),
  ]);

  return {
    charts: {
      used: chartsData.count,
      limit: DAILY_CHART_LIMIT,
      firstGenerationAt: chartsData.firstGenerationAt?.toISOString(),
    },
    reports: {
      used: reportsData.count,
      limit: DAILY_REPORT_LIMIT,
      firstGenerationAt: reportsData.firstGenerationAt?.toISOString(),
    },
    messages: {
      used: messagesData.count,
      limit: DAILY_MESSAGE_LIMIT,
      firstGenerationAt: messagesData.firstGenerationAt?.toISOString(),
    },
  };
}
