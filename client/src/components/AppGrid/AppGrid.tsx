import type { ReactNode } from "react";
import "./AppGrid.css";
interface AppGridProps {
  children?: ReactNode;
}

function AppGrid({ children }: AppGridProps) {
  return <div className="app-grid">{children}</div>;
}

export default AppGrid;
