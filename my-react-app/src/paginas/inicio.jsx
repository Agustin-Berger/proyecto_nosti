import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../moduls/inicio.module.css";

import useAuth from "../useAuth";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    usuario: "",
    contraseña: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(credentials);
    navigate("/ingreso");
  };

  return (
    <div className={styles.principal}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formcontrol}>
          <input
            placeholder="Usuario"
            className={styles.input}
            type="text"
            value={credentials.usuario}
            onChange={(e) =>
              setCredentials({ ...credentials, usuario: e.target.value })
            }
            required
          />
        </div>
        <div className={styles.formcontrol}>
          <input
            className={styles.input}
            placeholder="Contraseña"
            type="password"
            value={credentials.contraseña}
            onChange={(e) =>
              setCredentials({ ...credentials, contraseña: e.target.value })
            }
            required
          />
        </div>

        <button className={styles.button} type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
