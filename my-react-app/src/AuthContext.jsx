import { createContext, useState } from "react";
import PropTypes from "prop-types";
import api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const login = async (credentials) => {
    console.log("entre al login");
    try {
      const response = await api.post("/ingresar", credentials, {
        withCredentials: true,
      });
      console.log("Respuesta del servidor:", response.data.usuarioT);
      setIsAuthenticated(true);
      setUsuario(response.data.usuarioT);
      console.log("Estado de autenticación:", "usuario", usuario);
      return true; // Retorna true en caso de éxito
    } catch (error) {
      console.log("no sepudo");
      console.error("Error en el login:", error);
      return false; // Retorna false en caso de error
    }
  };

  const logout = async () => {
    console.log("entre al logout");
    await api.post("/cerrar-sesion", {}, { withCredentials: true });
    setIsAuthenticated(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
