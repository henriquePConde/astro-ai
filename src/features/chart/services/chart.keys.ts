export const chartKeys = {
    all: ['chart'] as const,
    calc: (payload: object) => [...chartKeys.all, 'calc', payload] as const,
};


