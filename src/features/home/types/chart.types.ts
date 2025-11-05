export interface Planet {
    name: string;
    symbol: string;
    position: number;
    absolutePosition: number;
    sign: number;
    color: string;
}

export interface Houses {
    firstHouse: number;
    secondHouse: number;
    thirdHouse: number;
    fourthHouse: number;
    fifthHouse: number;
    sixthHouse: number;
    seventhHouse: number;
    eighthHouse: number;
    ninthHouse: number;
    tenthHouse: number;
    eleventhHouse: number;
    twelfthHouse: number;
}

export interface ZodiacSign {
    symbol: string;
    degree: number;
    name: string;
}

export interface ChartData {
    planets: Planet[];
    houses: Houses;
    zodiacSigns?: ZodiacSign[];
    aspects: any[]; // Aspect type can be refined later
}

export interface BirthChartData {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    city: string;
    nation: string;
}

