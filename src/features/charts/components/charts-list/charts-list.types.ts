import type { CHARTS_LIST_CONFIG } from './charts-list.config';
import type { ChartListItemDto } from '@/backend/features/charts/http/charts.schemas';
import type { DataTableColumn } from '@/shared/components/data-table/data-table.types';

// Sorting / filters
export type SortBy = 'name' | 'birthdate' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ChartsFilters {
  page: number;
  pageSize: number;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface UseChartsFiltersResult {
  filters: ChartsFilters;
  setSearch: (search: string) => void;
  setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
  setPage: (page: number) => void;
}

// View props
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
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
  onPageChange: (page: number) => void;
  onGoToChart: (chartId: string) => void;
  /**
   * May perform async work (e.g., calling a mutation).
   */
  onDeleteChart: (chartId: string) => Promise<void> | void;
  isDeleting: boolean;
  config: typeof CHARTS_LIST_CONFIG;
}

// Table hook types
export interface ChartsListTableHookParams {
  charts: ChartListItemDto[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  pagination: ChartsListViewProps['pagination'];
  config: typeof CHARTS_LIST_CONFIG;
  onGoToChart: (chartId: string) => void;
  onDeleteChart: (chartId: string) => Promise<void> | void;
  isDeleting: boolean;
  onPageChange: (page: number) => void;
}

export interface ChartsListTableHookResult {
  columns: DataTableColumn<ChartListItemDto>[];
  rows: ChartListItemDto[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  isDeleting: boolean;
  deleteDialogOpen: boolean;
  onOpenDeleteDialog: (chartId: string) => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => Promise<void>;
  tablePagination: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}
