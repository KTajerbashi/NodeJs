import { NavLink } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="app-nav">
      <div className="app-nav__title">
        Navigation
      </div>

      <ul className="app-nav__list">
        <li>
          <NavLink
            to="/dashboard"
            className="app-nav__item"
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className="app-nav__item"
          >
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/roles"
            className="app-nav__item"
          >
            Roles
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className="app-nav__item"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;