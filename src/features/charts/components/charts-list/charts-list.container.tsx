'use client';

import { useRouter } from 'next/navigation';
import { useCharts } from '@/features/charts/services/charts.queries';
import { useDeleteChart } from '@/features/charts/services/charts.mutations';
import { ChartsListView } from './charts-list.view';
import { CHARTS_LIST_CONFIG } from './charts-list.config';
import { useChartsFilters } from './hooks/use-charts-filters.state';

export function ChartsListContainer() {
  const router = useRouter();
  const { filters, setSearch, setSort, setPage } = useChartsFilters(CHARTS_LIST_CONFIG.ui.pageSize);

  const { data, isLoading, error } = useCharts({
    page: filters.page,
    pageSize: filters.pageSize,
    search: filters.search || undefined,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  const handleGoToChart = (chartId: string) => {
    router.push(`/charts/${chartId}`);
  };

  const deleteMutation = useDeleteChart();

  const handleDeleteChart = async (chartId: string) => {
    // Let the view handle confirmation; this just executes the mutation.
    await deleteMutation.mutateAsync(chartId);
  };

  return (
    <ChartsListView
      charts={data?.items ?? []}
      isLoading={isLoading}
      error={error as Error | null}
      pagination={data?.pagination ?? { page: 1, pageSize: 20, total: 0, totalPages: 0 }}
      search={filters.search}
      sortBy={filters.sortBy}
      sortOrder={filters.sortOrder}
      onSearchChange={setSearch}
      onSortChange={setSort}
      onPageChange={setPage}
      onGoToChart={handleGoToChart}
      onDeleteChart={handleDeleteChart}
      isDeleting={deleteMutation.isPending}
      config={CHARTS_LIST_CONFIG}
    />
  );
}
