import { createContext, useState } from "react";
import PropTypes from "prop-types";
import api from "./api";

const AuthContext = createContext();
console.log("entre al contect");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const login = async (credentials) => {
    console.log("entre al login");
    try {
      const response = await api.post("/ingresar", credentials, {
        withCredentials: true,
      });
      console.log("Respuesta del servidor:", response.data.usuarioT.rol);
      setIsAuthenticated(true);
      setUsuario(response.data.usuarioT.rol);
      console.log("Estado de autenticación:", "usuario", usuario);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const logout = async () => {
    console.log("entre al logout");
    await api.post("/cerrar-sesion", {}, { withCredentials: true });
    setIsAuthenticated(false);
  };

  return (
    console.log("entre al provider3"),
    (
      <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
