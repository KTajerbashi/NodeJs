interface DataGridAction<T> {
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick: (row: T) => void;
}
