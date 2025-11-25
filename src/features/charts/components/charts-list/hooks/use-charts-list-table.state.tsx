import { useCallback, useMemo, useState } from 'react';
import { Box, Avatar, Button, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const columns: DataTableColumn<ChartListItemDto>[] = useMemo(() => {
    const nameColumnWidth = isMobile ? 'xs' : config.ui.columnWidths.name;
    const actionsColumnWidth = isMobile ? 'xl' : config.ui.columnWidths.actions;

    const cols: DataTableColumn<ChartListItemDto>[] = [
      {
        id: 'name',
        label: config.copy.columns.name,
        sortable: true,
        sortField: 'name',
        width: nameColumnWidth,
        renderCell: (chart) => {
          const initials = getInitials({ name: chart.name });
          return (
            <Box sx={styles.nameCell()}>
              {!isMobile && <Avatar sx={styles.avatar(32)}>{initials}</Avatar>}
              <Typography variant="body2" sx={styles.nameText()}>
                {chart.name}
              </Typography>
            </Box>
          );
        },
      },
    ];

    // On mobile, hide Birthdate and Created At columns to keep the table compact.
    if (!isMobile) {
      cols.push(
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
      );
    }

    cols.push({
      id: 'actions',
      label: config.copy.columns.actions,
      sortable: false,
      width: actionsColumnWidth,
      renderCell: (chart) => (
        <Box sx={styles.actionsRow(isMobile)}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={styles.goToChartButton(isMobile)}
            disabled={navigatingChartId === chart.id}
            onClick={() => {
              setNavigatingChartId(chart.id);
              onGoToChart(chart.id);
            }}
          >
            {navigatingChartId === chart.id ? (
              <CircularProgress size={16} color="inherit" />
            ) : isMobile ? (
              'Chart'
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
    });

    return cols;
  }, [config, onGoToChart, handleOpenDeleteDialog, navigatingChartId, isMobile]);

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
