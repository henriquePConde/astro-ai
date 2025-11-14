import type { ChartData, PlanetInfo, SignInfo } from '../types';

const signs = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

/**
 * Calculate planet positions and determine which house each planet belongs to.
 * Returns PlanetInfo[] with correct house numbers based on house cusps.
 */
export const calculatePlanetPositions = (data: ChartData): PlanetInfo[] => {
  const { planets, houses } = data;

  const houseCusps = [
    houses.firstHouse,
    houses.secondHouse,
    houses.thirdHouse,
    houses.fourthHouse,
    houses.fifthHouse,
    houses.sixthHouse,
    houses.seventhHouse,
    houses.eighthHouse,
    houses.ninthHouse,
    houses.tenthHouse,
    houses.eleventhHouse,
    houses.twelfthHouse,
  ];

  const signInfo: SignInfo[] = signs.map((signName, signIndex) => {
    const rulingHouses: number[] = [];
    const cuspDegrees: number[] = [];
    let isIntercepted = true;

    for (let i = 0; i < houseCusps.length; i++) {
      const cuspAbsDegree = houseCusps[i];
      const cuspSignIndex = Math.floor(cuspAbsDegree / 30) % 12;

      if (cuspSignIndex === signIndex) {
        isIntercepted = false;
        rulingHouses.push(i + 1);
        cuspDegrees.push(cuspAbsDegree % 30);
      }
    }

    return {
      name: signName,
      rulingHouses,
      cuspDegrees,
      signIndex,
      isIntercepted,
    };
  });

  const planetInfo = planets.map((planet) => {
    // Determine which house this planet belongs to
    let houseNumber = 1;
    const planetPosition = planet.position; // Use position instead of absolutePosition to match old implementation

    for (let i = 0; i < houseCusps.length; i++) {
      const currentCusp = houseCusps[i];
      const nextCusp = houseCusps[(i + 1) % 12];

      // Handle wraparound case (when next cusp is before current cusp)
      if (currentCusp > nextCusp) {
        if (planetPosition >= currentCusp || planetPosition < nextCusp) {
          houseNumber = i + 1;
          break;
        }
      } else {
        if (planetPosition >= currentCusp && planetPosition < nextCusp) {
          houseNumber = i + 1;
          break;
        }
      }
    }

    const planetSignIndex = planet.sign;
    const planetSign = signs[planetSignIndex];

    return {
      name: planet.name,
      position: planetPosition.toFixed(2),
      sign: planetSign,
      signDegree: (planetPosition % 30).toFixed(2),
      house: houseNumber,
      houseCusp: {
        degree: (houseCusps[houseNumber - 1] % 30).toFixed(2),
        sign: signs[Math.floor(houseCusps[houseNumber - 1] / 30) % 12],
        absoluteDegree: houseCusps[houseNumber - 1].toFixed(2),
      },
      signInfo: signInfo[planetSignIndex],
      symbol: planet.symbol,
    };
  });

  return planetInfo;
};

/**
 * Calculate the shortest angular distance between two positions on a circle
 */
const getAngularDistance = (pos1: number, pos2: number): number => {
  const diff = Math.abs(pos1 - pos2);
  return Math.min(diff, 360 - diff);
};

/**
 * Returns adjusted positions for planets to prevent visual overlap.
 * Adjusts planet positions when they are too close together.
 */
export const getAdjustedPlanetPositions = (planetPositions: PlanetInfo[]): Map<string, number> => {
  const minSeparation = 8; // Minimum degrees between planets
  const maxIterations = 50;

  // Create working copy with original positions
  const adjustedPlanets = planetPositions.map((planet) => ({
    name: planet.name,
    position: parseFloat(planet.position),
    originalPosition: parseFloat(planet.position),
  }));

  // Iteratively resolve conflicts
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let hasConflicts = false;

    // Check all pairs of planets for conflicts
    for (let i = 0; i < adjustedPlanets.length; i++) {
      for (let j = i + 1; j < adjustedPlanets.length; j++) {
        const planet1 = adjustedPlanets[i];
        const planet2 = adjustedPlanets[j];

        const distance = getAngularDistance(planet1.position, planet2.position);

        if (distance < minSeparation) {
          hasConflicts = true;

          // Calculate how much to move each planet
          const overlap = minSeparation - distance;
          const moveAmount = overlap / 2 + 0.5; // Add small buffer

          // Determine which direction to move each planet
          let diff = planet2.position - planet1.position;

          // Handle wraparound case
          if (Math.abs(diff) > 180) {
            if (diff > 0) {
              diff = diff - 360;
            } else {
              diff = diff + 360;
            }
          }

          if (diff > 0) {
            // Planet2 is clockwise from planet1
            planet1.position -= moveAmount;
            planet2.position += moveAmount;
          } else {
            // Planet2 is counter-clockwise from planet1
            planet1.position += moveAmount;
            planet2.position -= moveAmount;
          }

          // Normalize positions to 0-360 range
          planet1.position = ((planet1.position % 360) + 360) % 360;
          planet2.position = ((planet2.position % 360) + 360) % 360;
        }
      }
    }

    // If no conflicts found, we're done
    if (!hasConflicts) {
      break;
    }
  }

  // Convert back to Map format
  const result = new Map<string, number>();
  adjustedPlanets.forEach((planet) => {
    result.set(planet.name, planet.position);
  });

  return result;
};
