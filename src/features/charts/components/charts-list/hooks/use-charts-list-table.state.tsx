import { useCallback, useMemo, useState } from 'react';
import { Box, Avatar, Button, Typography, CircularProgress } from '@mui/material';
import { styles } from '../charts-list.styles';
import { getInitials } from '@/shared/utils/get-initials';
import type { ChartsListTableHookParams, ChartsListTableHookResult } from '../charts-list.types';
import type { DataTableColumn } from '@/shared/components/data-table/data-table.types';
import type { ChartListItemDto } from '@/backend/features/charts/http/charts.schemas';

export function useChartsListTable({
  charts,
  sortBy,
  sortOrder,
  pagination,
  config,
  onGoToChart,
  onDeleteChart,
  isDeleting,
  onPageChange,
}: ChartsListTableHookParams): ChartsListTableHookResult {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [navigatingChartId, setNavigatingChartId] = useState<string | null>(null);

  const handleOpenDeleteDialog = useCallback((chartId: string) => {
    setDeleteTargetId(chartId);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTargetId) return;
    await onDeleteChart(deleteTargetId);
    setDeleteTargetId(null);
  }, [deleteTargetId, onDeleteChart]);

  const columns: DataTableColumn<ChartListItemDto>[] = useMemo(
    () => [
      {
        id: 'name',
        label: config.copy.columns.name,
        sortable: true,
        sortField: 'name',
        width: config.ui.columnWidths.name,
        renderCell: (chart) => {
          const initials = getInitials({ name: chart.name });
          return (
            <Box sx={styles.nameCell()}>
              <Avatar sx={styles.avatar(32)}>{initials}</Avatar>
              <Typography variant="body2">{chart.name}</Typography>
            </Box>
          );
        },
      },
      {
        id: 'birthdate',
        label: config.copy.columns.birthdate,
        sortable: true,
        sortField: 'birthdate',
        width: config.ui.columnWidths.birthdate,
        renderCell: (chart) => {
          const birthdateStr = `${chart.birthdate.year}-${String(chart.birthdate.month).padStart(
            2,
            '0',
          )}-${String(chart.birthdate.day).padStart(2, '0')}`;
          return <Typography variant="body2">{birthdateStr}</Typography>;
        },
      },
      {
        id: 'createdAt',
        label: config.copy.columns.createdAt,
        sortable: true,
        sortField: 'createdAt',
        width: config.ui.columnWidths.createdAt,
        renderCell: (chart) => {
          const createdAtDate = new Date(chart.createdAt);
          const createdAtStr = createdAtDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return <Typography variant="body2">{createdAtStr}</Typography>;
        },
      },
      {
        id: 'actions',
        label: config.copy.columns.actions,
        sortable: false,
        width: config.ui.columnWidths.actions,
        renderCell: (chart) => (
          <Box sx={styles.actionsRow()}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={styles.goToChartButton()}
              disabled={navigatingChartId === chart.id}
              onClick={() => {
                setNavigatingChartId(chart.id);
                onGoToChart(chart.id);
              }}
            >
              {navigatingChartId === chart.id ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                config.copy.actions.goToChart
              )}
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleOpenDeleteDialog(chart.id)}
            >
              {config.copy.actions.deleteChart}
            </Button>
          </Box>
        ),
      },
    ],
    [config, onGoToChart, handleOpenDeleteDialog, navigatingChartId],
  );

  return {
    columns,
    rows: charts,
    sortBy,
    sortOrder,
    isDeleting,
    deleteDialogOpen: !!deleteTargetId,
    onOpenDeleteDialog: handleOpenDeleteDialog,
    onCloseDeleteDialog: handleCloseDeleteDialog,
    onConfirmDelete: handleConfirmDelete,
    tablePagination: {
      page: pagination.page,
      totalPages: pagination.totalPages,
      onPageChange,
    },
  };
}
