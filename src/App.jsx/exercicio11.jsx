import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AppLayout } from "./shared/layout/AppLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { useCallback, useEffect, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "auth_user";

function isAuthenticatedFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed?.username != null && String(parsed.username).trim() !== "";
  } catch {
    return false;
  }
}

function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname || "/" }}
      />
    );
  }
  return children;
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedFromStorage,
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        setIsAuthenticated(isAuthenticatedFromStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback((username) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ username }));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const auth = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <BrowserRouter>
      <AppLayout isAuthenticated={isAuthenticated} onLogout={auth.logout}>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={auth.login} />
              )
            }
          />

          <Route
            path="/"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/about"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <About />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
