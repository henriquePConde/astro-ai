import type { CHARTS_LIST_CONFIG } from './charts-list.config';
import type { ChartListItemDto } from '@/backend/features/charts/http/charts.schemas';

export interface ChartsListViewProps {
  charts: ChartListItemDto[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  search: string;
  sortBy: 'name' | 'birthdate' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (value: string) => void;
  onSortChange: (sortBy: 'name' | 'birthdate' | 'createdAt', sortOrder: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  onGoToChart: (chartId: string) => void;
  config: typeof CHARTS_LIST_CONFIG;
}
