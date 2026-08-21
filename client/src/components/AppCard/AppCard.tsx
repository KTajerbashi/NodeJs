import type { ReactNode } from "react";
import "./AppCard.css";

interface AppCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function AppCard({
  title,
  description,
  actions,
  children,
  className = "",
}: AppCardProps) {
  const hasHeader = title || description || actions;

  return (
    <section className={`app-card ${className}`}>
      {hasHeader && (
        <header className="app-card__header">
          <div className="app-card__heading">
            {title && <strong className="app-card__title" title={description}>{title}</strong>}
          </div>

          {actions && (
            <div className="app-card__actions">
              {actions}
            </div>
          )}
        </header>
      )}

      <div className="app-card__content">
        {children}
      </div>
    </section>
  );
}