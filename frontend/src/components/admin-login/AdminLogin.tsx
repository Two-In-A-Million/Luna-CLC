import { useState } from "react";
import styles from "./AdminLogin.module.css";

interface Props {
  onLoginSuccess: (token: string) => void;
}

const AdminLogin: React.FC<Props> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("ACCESS DENIED");
      return;
    }

    const data = await res.json();
    localStorage.setItem("adminToken", data.token);
    onLoginSuccess(data.token);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>ADMIN ACCESS</div>

        <div className={styles.loginField}>
          <label>Username</label>
          <input
            className={styles.loginInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.loginField}>
          <label>Password</label>
          <input
            type="password"
            className={styles.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          LOGIN
        </button>

        {error && <div className={styles.loginError}>{error}</div>}
      </div>
    </div>
  );
};

export default AdminLogin;
