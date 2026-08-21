import type { ReactNode } from "react";
import "./AppGridItem.css";
interface AppGridItemProps {
  children?: ReactNode;
  className?: string;
}

function AppGridItem({ children, className }: AppGridItemProps) {
  return <div className={className}>{children}</div>;
}

export default AppGridItem;
