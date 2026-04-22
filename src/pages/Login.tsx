import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../shared/layout/Login.module.css";
import { useAuth } from "../shared/auth/AuthContext";

const VALID_USER = "admin";
const VALID_PASS = "123";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return username.trim() !== "" && password.trim() !== "";
  }, [username, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const u = username.trim();
    const p = password;

    if (u === VALID_USER && p === VALID_PASS) {
      login(u);
      const redirectTo =
        (location.state as { from?: string } | null)?.from || "/";
      navigate(redirectTo, { replace: true });
      return;
    }

    setError("Usuário ou senha inválidos.");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Entrar</h2>
        <p className={styles.subtitle}>
          usuário: <strong>{VALID_USER}</strong> / senha:{" "}
          <strong>{VALID_PASS}</strong>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="username">
            Usuário
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />

          <label className={styles.label} htmlFor="password">
            Senha
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />

          {error ? <div className={styles.error}>{error}</div> : null}

          <button className={styles.button} type="submit" disabled={!canSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
