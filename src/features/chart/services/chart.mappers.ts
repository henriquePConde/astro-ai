import type { ChartData as ApiChartData } from './chart.service';
import type { ChartData as WheelChartData, Planet, HouseCusps } from '@/shared/components/astro-chart/types';

export function toWheelData(api: ApiChartData): WheelChartData {
    const planets: Planet[] = api.planets.map((p) => ({
        name: p.name,
        symbol: p.symbol, // Backend now provides symbol
        position: p.degree, // Backend uses 'degree' instead of 'position'
        absolutePosition: p.degree, // Same as position
        sign: p.sign, // Backend now returns number (0-11) directly
        color: p.color, // Backend provides color
    }));

    const houses = api.houses as unknown as Partial<HouseCusps>;
    const wheelHouses: HouseCusps = {
        firstHouse: Number(houses.firstHouse ?? houses['firstHouse'] ?? 0),
        secondHouse: Number(houses.secondHouse ?? houses['secondHouse'] ?? 30),
        thirdHouse: Number(houses.thirdHouse ?? houses['thirdHouse'] ?? 60),
        fourthHouse: Number(houses.fourthHouse ?? houses['fourthHouse'] ?? 90),
        fifthHouse: Number(houses.fifthHouse ?? houses['fifthHouse'] ?? 120),
        sixthHouse: Number(houses.sixthHouse ?? houses['sixthHouse'] ?? 150),
        seventhHouse: Number(houses.seventhHouse ?? houses['seventhHouse'] ?? 180),
        eighthHouse: Number(houses.eighthHouse ?? houses['eighthHouse'] ?? 210),
        ninthHouse: Number(houses.ninthHouse ?? houses['ninthHouse'] ?? 240),
        tenthHouse: Number(houses.tenthHouse ?? houses['tenthHouse'] ?? 270),
        eleventhHouse: Number(houses.eleventhHouse ?? houses['eleventhHouse'] ?? 300),
        twelfthHouse: Number(houses.twelfthHouse ?? houses['twelfthHouse'] ?? 330),
    };

    return { planets, houses: wheelHouses, aspects: api.aspects ?? [] };
}


