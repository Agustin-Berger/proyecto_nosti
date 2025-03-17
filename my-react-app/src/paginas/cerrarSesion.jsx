import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CerrarSesion = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const hand = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Error al cerrar sesión. Intente nuevamente.");
    }
  };

  return (
    <div>
      <h1>Identifiquese para continuar </h1>
      <button onClick={hand}>Identificarse</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CerrarSesion;
