import type { ReactNode } from "react";
import "./AppContainer.css";

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

export function AppContainer({ children, className = "" }: AppContainerProps) {
  return <div className={`app-container ${className}`}>{children}</div>;
}
