import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuth = () => {
  console.log("useAuth called");
  const respuesta = useContext(AuthContext);
  return respuesta;
};

export default useAuth;
