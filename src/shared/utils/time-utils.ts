/**
 * Utility functions for calculating time until reset (24-hour rolling window).
 */

/**
 * Calculate milliseconds until 24 hours have passed from a given timestamp.
 * @param firstGenerationAt ISO timestamp string of the first generation
 * @returns Milliseconds until reset (24 hours from first generation)
 */
export function getTimeUntil24HourReset(firstGenerationAt: string | undefined): number {
  if (!firstGenerationAt) {
    // If no first generation timestamp, return 0 (can generate immediately)
    return 0;
  }

  const firstGenDate = new Date(firstGenerationAt);
  const resetTime = new Date(firstGenDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
  return resetTime.getTime() - Date.now();
}

/**
 * Format milliseconds as a human-readable time remaining string.
 * - >= 1 hour: "X hours"
 * - >= 1 minute: "X minutes"
 * - < 1 minute: "X seconds"
 */
export function formatTimeRemaining(ms: number): string {
  // Ensure non-negative value
  const remaining = Math.max(0, ms);
  const seconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 1) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (minutes >= 1) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
}
