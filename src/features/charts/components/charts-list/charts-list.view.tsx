'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
// Using native Date formatting instead of date-fns
import type { ChartsListViewProps, SortBy } from './charts-list.types';
import { styles } from './charts-list.styles';
import { DataTableView } from '@/shared/components/data-table/data-table.view';
import { useChartsListTable } from './hooks/use-charts-list-table.state';
import type { DataTableSortOrder } from '@/shared/components/data-table/data-table.types';

export function ChartsListView({
  charts,
  isLoading,
  error,
  pagination,
  search,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortChange,
  onPageChange,
  onGoToChart,
  onDeleteChart,
  isDeleting,
  config,
}: ChartsListViewProps) {
  const handleTableSortChange = React.useCallback(
    (field: string, order: DataTableSortOrder) => {
      onSortChange(field as SortBy, order);
    },
    [onSortChange],
  );

  const {
    columns,
    rows,
    deleteDialogOpen,
    isDeleting: isDeleteInProgress,
    onCloseDeleteDialog,
    onConfirmDelete,
    tablePagination,
  } = useChartsListTable({
    charts,
    sortBy,
    sortOrder,
    pagination,
    config,
    onGoToChart,
    onDeleteChart,
    isDeleting,
    onPageChange,
  });

  if (error) {
    return (
      <Box sx={styles.root()}>
        <Alert severity="error">{config.copy.error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={styles.root()}>
      <Box sx={styles.header()}>
        <Typography variant="h4">{config.copy.title}</Typography>
        <TextField
          placeholder={config.copy.searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={styles.searchBox()}
        />
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : charts.length === 0 ? (
        <Box sx={styles.emptyState()}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {config.copy.empty.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {config.copy.empty.description}
          </Typography>
        </Box>
      ) : (
        <>
          <DataTableView
            rows={rows}
            columns={columns}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleTableSortChange}
            getRowId={(chart) => chart.id as string}
            pagination={{
              page: tablePagination.page,
              totalPages: tablePagination.totalPages,
              onPageChange: tablePagination.onPageChange,
            }}
          />
        </>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={onCloseDeleteDialog}
        aria-labelledby="delete-chart-dialog-title"
      >
        <DialogTitle id="delete-chart-dialog-title">
          {config.copy.actions.deleteConfirmTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{config.copy.actions.deleteConfirmDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={styles.deleteDialogCancelButton()}
            onClick={onCloseDeleteDialog}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={styles.deleteDialogConfirmButton()}
            disabled={isDeleteInProgress}
            onClick={onConfirmDelete}
          >
            {isDeleteInProgress ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              config.copy.actions.deleteChart
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
