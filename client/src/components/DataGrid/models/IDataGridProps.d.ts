interface DataGridProps<T> {
  columns: readonly DataGridColumn<T>[];

  data: readonly T[];

  actions?: readonly DataGridAction<T>[];

  loading?: boolean;

  emptyMessage?: string;

  onRowClick?: (row: T) => void;
}
