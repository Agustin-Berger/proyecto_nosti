import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import PropTypes from "prop-types";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("Estado de autenticación:", isAuthenticated); // Agrega este log

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
