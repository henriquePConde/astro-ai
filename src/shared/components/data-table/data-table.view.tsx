'use client';

import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Pagination,
} from '@mui/material';
import { dataTableStyles as styles } from './data-table.styles';
import type { DataTableViewProps } from './data-table.types';

export function DataTableView<TData>({
  rows,
  columns,
  sortBy,
  sortOrder = 'asc',
  onSortChange,
  getRowId,
  pagination,
}: DataTableViewProps<TData>) {
  const handleSort = (field: string) => {
    if (!onSortChange) return;

    const isSameField = sortBy === field;
    const nextOrder = isSameField && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(field, nextOrder);
  };

  return (
    <>
      <TableContainer component={Paper} sx={styles.tableContainer()}>
        <Table sx={styles.table()}>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const sortField = column.sortField ?? column.id;
                const isActive = sortBy === sortField;

                if (!column.sortable || !onSortChange) {
                  return (
                    <TableCell
                      key={column.id}
                      sx={column.width ? styles.column(column.width) : undefined}
                      align={column.align ?? 'left'}
                    >
                      {column.label}
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    key={column.id}
                    sx={column.width ? styles.column(column.width) : undefined}
                    align={column.align ?? 'left'}
                  >
                    <TableSortLabel
                      active={isActive}
                      direction={isActive ? sortOrder : 'asc'}
                      onClick={() => handleSort(sortField)}
                      sx={styles.sortableHeader()}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={getRowId(row, rowIndex)} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={column.width ? styles.column(column.width) : undefined}
                    align={column.align ?? 'left'}
                  >
                    {column.renderCell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && pagination.totalPages > 1 && (
        <Box sx={styles.pagination()}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={(_, page) => pagination.onPageChange(page)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
}
