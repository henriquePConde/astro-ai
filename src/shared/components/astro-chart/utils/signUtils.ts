import type { ChartData, SignInfo } from '../types';
import { ZODIAC_SIGNS } from './constants';

/**
 * Calculate which signs rule which houses based on house cusps.
 * Determines intercepted signs (signs that don't rule any house cusp).
 */
export const getSignInfo = (data: ChartData): SignInfo[] => {
  const signs = ZODIAC_SIGNS;

  const houseCusps = [
    data.houses.firstHouse,
    data.houses.secondHouse,
    data.houses.thirdHouse,
    data.houses.fourthHouse,
    data.houses.fifthHouse,
    data.houses.sixthHouse,
    data.houses.seventhHouse,
    data.houses.eighthHouse,
    data.houses.ninthHouse,
    data.houses.tenthHouse,
    data.houses.eleventhHouse,
    data.houses.twelfthHouse,
  ];

  return signs.map((name, signIndex) => {
    const rulingHouses: number[] = [];
    const cuspDegrees: number[] = [];
    let isIntercepted = true;

    for (let i = 0; i < houseCusps.length; i++) {
      const cuspAbs = houseCusps[i];
      const cuspSign = Math.floor(cuspAbs / 30) % 12;

      if (cuspSign === signIndex) {
        isIntercepted = false;
        rulingHouses.push(i + 1);
        cuspDegrees.push(cuspAbs % 30);
      }
    }

    return {
      name,
      rulingHouses,
      cuspDegrees,
      signIndex,
      isIntercepted,
    };
  });
};
