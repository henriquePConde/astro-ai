/**
 * Utility to match birth data objects.
 * Compares key fields to determine if two birth data objects represent the same birth chart.
 */
export function matchBirthData(birthData1: any, birthData2: any): boolean {
  if (!birthData1 || !birthData2) return false;

  // Compare required fields
  const fields: Array<keyof typeof birthData1> = ['year', 'month', 'day', 'hour', 'minute'];

  for (const field of fields) {
    if (birthData1[field] !== birthData2[field]) {
      return false;
    }
  }

  // Optional fields (city, nation) - if both are present, they should match
  // But we don't require them to match if one is missing
  if (birthData1.city && birthData2.city && birthData1.city !== birthData2.city) {
    return false;
  }
  if (birthData1.nation && birthData2.nation && birthData1.nation !== birthData2.nation) {
    return false;
  }

  return true;
}
