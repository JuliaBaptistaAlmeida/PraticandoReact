import { NavLink } from "react-router-dom";

export const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <header>
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
        </nav>
        <h1>Aprendendo React</h1>
      </header>

      <main>{children}</main>

      <footer className="app-footer">&copy; 2026 Xulinha</footer>
    </div>
  );
};
