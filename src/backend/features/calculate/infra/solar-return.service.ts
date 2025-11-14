const swisseph = require('swisseph-v2');

const TROPICAL_FLAGS = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

function julianToDate(jd: number): Date {
  const date = swisseph.swe_revjul(jd, swisseph.SE_GREG_CAL);
  return new Date(
    Date.UTC(
      date.year,
      date.month - 1, // JavaScript months are 0-based
      date.day,
      date.hour || 0,
      date.minute || 0,
      date.second || 0,
    ),
  );
}

function findExactTime(approximateJd: number, targetLongitude: number): Date {
  let startJd = approximateJd;
  let endJd = approximateJd + 1;
  let iterations = 0;
  const maxIterations = 20;

  while (iterations < maxIterations) {
    const midJd = (startJd + endJd) / 2;
    const result = swisseph.swe_calc_ut(midJd, 0, TROPICAL_FLAGS);

    if ('error' in result) {
      throw new Error(`Error in binary search: ${result.error}`);
    }

    if (!('longitude' in result)) {
      throw new Error('Invalid Sun calculation result');
    }

    const diff = result.longitude - targetLongitude;

    if (Math.abs(diff) < 0.00001) {
      return julianToDate(midJd);
    }

    if (diff < 0) {
      startJd = midJd;
    } else {
      endJd = midJd;
    }

    iterations++;
  }

  return julianToDate(approximateJd);
}

export function findSolarReturnMoment(
  natalSunLongitude: number,
  targetYear: number,
  birthMonth: number,
  birthDay: number,
): Date {
  const jd = swisseph.swe_julday(
    Number(targetYear),
    Number(birthMonth),
    Number(birthDay),
    0,
    swisseph.SE_GREG_CAL,
  );

  for (let i = -2; i < 3; i++) {
    const currentJd = jd + i;
    const result = swisseph.swe_calc_ut(currentJd, 0, TROPICAL_FLAGS);

    if ('error' in result) {
      throw new Error(`Error calculating Sun position: ${result.error}`);
    }

    if (!('longitude' in result)) {
      continue;
    }

    if (Math.abs(result.longitude - natalSunLongitude) < 1) {
      return findExactTime(currentJd, natalSunLongitude);
    }
  }

  throw new Error('Could not find solar return within reasonable range');
}
