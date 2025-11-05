import { useMutation } from '@tanstack/react-query';
import { calculateChart, type ChartData } from '../services/chart.service';

export function useCalcChart() {
    return useMutation<ChartData, unknown, Parameters<typeof calculateChart>[0]>({
        mutationFn: (payload) => calculateChart(payload),
    });
}


