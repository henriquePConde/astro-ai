'use client';

import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Avatar,
  Button,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
// Using native Date formatting instead of date-fns
import type { ChartsListViewProps } from './charts-list.types';
import { styles } from './charts-list.styles';
import { getInitials } from '@/shared/utils/get-initials';

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
  config,
}: ChartsListViewProps) {
  const handleSort = (field: 'name' | 'birthdate' | 'createdAt') => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newOrder);
  };

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
          <TableContainer component={Paper} sx={styles.tableContainer()}>
            <Table sx={styles.table()}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortOrder : 'asc'}
                      onClick={() => handleSort('name')}
                      sx={styles.sortableHeader()}
                    >
                      {config.copy.columns.name}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'birthdate'}
                      direction={sortBy === 'birthdate' ? sortOrder : 'asc'}
                      onClick={() => handleSort('birthdate')}
                      sx={styles.sortableHeader()}
                    >
                      {config.copy.columns.birthdate}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'createdAt'}
                      direction={sortBy === 'createdAt' ? sortOrder : 'asc'}
                      onClick={() => handleSort('createdAt')}
                      sx={styles.sortableHeader()}
                    >
                      {config.copy.columns.createdAt}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>{config.copy.columns.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charts.map((chart) => {
                  const initials = getInitials({ name: chart.name });
                  const birthdateStr = `${chart.birthdate.year}-${String(chart.birthdate.month).padStart(2, '0')}-${String(chart.birthdate.day).padStart(2, '0')}`;
                  const createdAtDate = new Date(chart.createdAt);
                  const createdAtStr = createdAtDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <TableRow key={chart.id} hover>
                      <TableCell>
                        <Box sx={styles.nameCell()}>
                          <Avatar sx={styles.avatar(32)}>{initials}</Avatar>
                          <Typography variant="body2">{chart.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{birthdateStr}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{createdAtStr}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onGoToChart(chart.id)}
                        >
                          {config.copy.actions.goToChart}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {pagination.totalPages > 1 && (
            <Box sx={styles.pagination()}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
