import type { ReactNode } from "react";
import "./AppActions.css";

interface AppActionProps {
  children: ReactNode;
  className?: string;
}

export function AppAction({ children, className = "" }: AppActionProps) {
  return (
    <div className={`app-action ${className}`}>
      {children && children}
    </div>
  );
}
