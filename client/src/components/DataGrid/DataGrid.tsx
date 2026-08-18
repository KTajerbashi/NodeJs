import "./DataGrid.css";

// import type { DataGridProps } from "./types";

function DataGrid<T>({
  columns,
  data,
  actions,
  loading = false,
  emptyMessage = "No data found",
  onRowClick,
}: DataGridProps<T>) {
  if (loading) {
    return <div className="data-grid-loading">Loading...</div>;
  }

  if (!data.length) {
    return <div className="data-grid-empty">{emptyMessage}</div>;
  }

  return (
    <div className="data-grid-container">
      <table className="data-grid">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.title}</th>
            ))}

            {actions && actions.length > 0 && <th className="app-column-action">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "clickable-row" : ""}
            >
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(row)
                    : column.key
                      ? String(row[column.key])
                      : null}
                </td>
              ))}

              {actions && actions.length > 0 && (
                <td className="app-column-action">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      // className={action.className}
                      className={`app-btn ${action.className ?? ""}`}
                      onClick={(e) => {
                        e.stopPropagation();

                        action.onClick(row);
                      }}
                    >
                      {action.icon}

                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
