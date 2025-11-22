import type { ReactNode } from 'react';

export type DataTableSortOrder = 'asc' | 'desc';

export type DataTableColumnWidth = 'sm' | 'md' | 'lg' | 'xl';

export interface DataTableColumn<TData> {
  id: string;
  label: ReactNode;
  /**
   * Whether this column is sortable. Defaults to false.
   */
  sortable?: boolean;
  /**
   * Field key used when reporting sort changes. Falls back to `id` if not provided.
   */
  sortField?: string;
  /**
   * Semantic width token. Mapped to percentages inside the component.
   */
  width?: DataTableColumnWidth;
  /**
   * Text alignment for the column. Defaults to "left".
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Renders the cell contents for this column.
   */
  renderCell: (row: TData) => ReactNode;
}

export interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface DataTableViewProps<TData> {
  rows: TData[];
  columns: DataTableColumn<TData>[];
  /**
   * Current sort field. Typically comes from URL / state in a container.
   */
  sortBy?: string | null;
  /**
   * Current sort order.
   */
  sortOrder?: DataTableSortOrder;
  /**
   * Called when a sortable header is clicked.
   */
  onSortChange?: (sortBy: string, sortOrder: DataTableSortOrder) => void;
  /**
   * Provides a stable key for each row.
   */
  getRowId: (row: TData, index: number) => string | number;
  /**
   * Optional pagination. When omitted, no pagination controls are rendered.
   */
  pagination?: DataTablePaginationProps;
}
