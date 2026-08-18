import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import authService from "../../services/authService";
import { useState } from "react";

function Header() {
  const [user] = useState<User | null>(() => authService.getCurrentUser());
  return (
    <header className="app-header">
      <Link
        to="/dashboard"
        className="app-header__brand"
        aria-label="Go to dashboard"
      >
        <span className="app-header__logo">{user && user.firstName[0]}</span>

        <span className="app-header__title">React Admin</span>
      </Link>

      <nav className="app-header__navigation">
        <NavLink to="/login" className="app-header__link">
          Login
        </NavLink>

        <NavLink to="/signup" className="app-header__link">
          Sign Up
        </NavLink>

        <NavLink to="/profile" className="app-header__user">
          <span className="app-header__avatar">
            {user &&
              user.firstName[0].toUpperCase() +
                "_" +
                user.lastName[0].toUpperCase()}
          </span>

          <span className="app-header__username">
            {user && user.firstName + "_" + user.lastName}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
