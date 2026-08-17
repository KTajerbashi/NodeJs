interface DataGridColumn<T> {
  key?: keyof T;

  title: string;

  sortable?: boolean;

  render?: (row: T) => ReactNode;
}
