import { useState, useCallback } from 'react';
import type {
  ChartsFilters,
  SortBy,
  SortOrder,
  UseChartsFiltersResult,
} from '../charts-list.types';

/**
 * UI state hook for charts list filters.
 * Component-level hook for local UI state only (no I/O).
 */
export function useChartsFilters(initialPageSize: number = 5): UseChartsFiltersResult {
  const [filters, setFilters] = useState<ChartsFilters>({
    page: 1,
    pageSize: initialPageSize,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 })); // Reset to page 1 on search
  }, []);

  const setSort = useCallback((sortBy: SortBy, sortOrder: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder, page: 1 })); // Reset to page 1 on sort
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return {
    filters,
    setSearch,
    setSort,
    setPage,
  };
}
