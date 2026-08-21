import type { ReactNode } from "react";
import "./AppTitle.css";

interface AppTitleProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function AppTitle({
  title,
  children,
  className = "",
}: AppTitleProps) {

  return (
    <div title={title} className={`app-title ${className}`}>
      {children}
    </div>
  );
}