import type { ReactNode } from "react";
import "./Main.css";

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <main className="app-main">
      {children}
    </main>
  );
}

export default Main;