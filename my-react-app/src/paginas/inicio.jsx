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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(credentials);
    console.log("success", credentials, success);
    if (success) {
      console.log("Inicio de sesión exitoso");
      navigate("/ingreso");
    } else {
      console.log("Inicio de sesión fallido");
      setErrorMessage("Usuario o contraseña incorrectos");
    }
    console.log(credentials, "credec");
  };

  return (
    <div className={styles.principal}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
