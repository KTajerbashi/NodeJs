import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";
import authService from "../../../services/authService";

function Header() {
  const [user, setUser] = useState<IUser | undefined>();
  const [auth, setAuth] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        const currentUser = await authService.getCurrentUser();
        const isAuth = await authService.isAuthentication();

        if (isMounted) {
          console.log("Current User:", currentUser);
          setUser(currentUser.data);
          setAuth(isAuth.data);
        }
      } catch (error) {
        console.error("Failed to load current user:", error);
      }
    }

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  const username = [firstName, lastName].filter(Boolean).join("_");

  const onLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <Link
        to="/dashboard"
        className="app-header__brand"
        aria-label="Go to dashboard"
      >
        <span className="app-header__logo">
          {firstName[0]?.toUpperCase() ?? "?"}
        </span>

        <span className="app-header__title">
          <span className="tech-badge">
            <span className="react-icon">⚛</span>
            React
          </span>

          <span className="tech-divider"></span>

          <span className="tech-badge">
            <span className="node-icon">⬢</span>
            Node
          </span>

          <span className="tech-divider"></span>

          <span className="tech-badge">
            <span className="mongo-icon">🍃</span>
            Mongo
          </span>
        </span>
      </Link>

      <nav className="app-header__navigation">
        <NavLink to="/profile" className="app-header__user">
          <span className="app-header__avatar">{initials || "?"}</span>
          <span className="app-header__username">{username || "User"}</span>
        </NavLink>
        {auth ? (
          <button
            type="button"
            onClick={onLogout}
            className="app-header__link app-logout"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="app-header__link app-login">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
