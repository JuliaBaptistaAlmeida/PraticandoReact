import { NavLink, useLocation } from "react-router-dom";

export const AppLayout = ({ children, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-layout">
      <header>
        {!isLoginPage ? (
          <nav className="app-nav" aria-label="Navegação principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `app-nav__btn${isActive ? " app-nav__btn--active" : ""}`
              }
            >
              Página inicial
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `app-nav__btn${isActive ? " app-nav__btn--active" : ""}`
              }
            >
              Sobre
            </NavLink>

            {isAuthenticated ? (
              <button type="button" className="app-nav__btn" onClick={onLogout}>
                Sair
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `app-nav__btn${isActive ? " app-nav__btn--active" : ""}`
                }
              >
                Login
              </NavLink>
            )}
          </nav>
        ) : null}
        <h1>Aprendendo React</h1>
      </header>

      <main>{children}</main>

      <footer className="app-footer">&copy; 2026 Xulinha</footer>
    </div>
  );
};
