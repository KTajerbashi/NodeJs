import { Link, NavLink } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <Link
        to="/dashboard"
        className="app-header__brand"
        aria-label="Go to dashboard"
      >
        <span className="app-header__logo">
          R
        </span>

        <span className="app-header__title">
          React Admin
        </span>
      </Link>

      <nav className="app-header__navigation">
        <NavLink
          to="/login"
          className="app-header__link"
        >
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className="app-header__link"
        >
          Sign Up
        </NavLink>

        <NavLink
          to="/profile"
          className="app-header__user"
        >
          <span className="app-header__avatar">
            A
          </span>

          <span className="app-header__username">
            Admin
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;