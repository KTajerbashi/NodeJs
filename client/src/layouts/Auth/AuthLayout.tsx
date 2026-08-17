import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <div className="auth-layout__brand">
          <span className="auth-layout__logo">
            R
          </span>

          <span className="auth-layout__title">
            React Admin
          </span>
        </div>

        <main className="auth-layout__content">
          <Outlet />
        </main>

        <footer className="auth-layout__footer">
          © 2026 React Admin
        </footer>
      </div>
    </div>
  );
}

export default AuthLayout;