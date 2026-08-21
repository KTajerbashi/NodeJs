import type { ReactNode } from "react";
import "./AppContent.css";

interface AppContentProps {
  children: ReactNode;
  className?: string;
}

export function AppContent({
  children,
  className = "",
}: AppContentProps) {
  return (
    <section className={`app-content ${className}`}>
      <div className="app-content__content">
        {children}
      </div>
    </section>
  );
}