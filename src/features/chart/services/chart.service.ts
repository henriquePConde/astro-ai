import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const finite = () => z.number().finite();

export const PlanetDto = z.object({
    name: z.string(),
    symbol: z.string(),
    degree: finite(),
    sign: finite(), // Backend returns number (0-11), not string
    color: z.string(),
});

export const AspectDto = z.object({
    p1_name: z.string(), // Backend uses p1_name, not planet1
    p1_abs_pos: finite(),
    p2_name: z.string(), // Backend uses p2_name, not planet2
    p2_abs_pos: finite(),
    type: z.enum(['conjunction', 'opposition', 'trine', 'square', 'sextile']),
    exactAngle: finite(),
    actualAngle: finite(),
});

export const HousesDto = z.object({
    firstHouse: finite(),
    secondHouse: finite(),
    thirdHouse: finite(),
    fourthHouse: finite(),
    fifthHouse: finite(),
    sixthHouse: finite(),
    seventhHouse: finite(),
    eighthHouse: finite(),
    ninthHouse: finite(),
    tenthHouse: finite(),
    eleventhHouse: finite(),
    twelfthHouse: finite(),
});

export const ChartResponseDto = z.object({
    success: z.literal(true),
    data: z.object({
        planets: z.array(PlanetDto),
        houses: HousesDto,
        aspects: z.array(AspectDto),
    }),
});

export type ChartData = z.infer<typeof ChartResponseDto>['data'];

export async function calculateChart(payload: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    city?: string;
    nation?: string;
}) {
    const res = await client.post('/api/calculate', payload);
    const parsed = ChartResponseDto.parse(res.data);
    return parsed.data;
}


