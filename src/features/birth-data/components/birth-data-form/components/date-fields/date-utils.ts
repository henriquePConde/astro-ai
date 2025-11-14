export function getDaysInMonth(year?: number, month?: number): number {
  if (!year || !month) return 31;
  // month: 1-12
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  switch (month) {
    case 2:
      return isLeap ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}
