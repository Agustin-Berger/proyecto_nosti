import { useState } from "react";
import api from "../api";

import { useNavigate } from "react-router-dom";
import styles from "../moduls/fechas.module.css";
function Fechas() {
  const [data, setData] = useState([]);
  const [satrtDate, setSatrtDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  const fetchData = async () => {
    if (satrtDate && endDate) {
      try {
        const response = await api.get(
          `/fecha?startDate=${satrtDate}&endDate=${endDate}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error, "error al obtener los datos");
      }
    } else {
      console.log("ingrese fechas");
    }
  };

  // Función para calcular la suma de todos los totales
  const calcularSumaTotal = () => {
    return data.reduce((acc, item) => {
      return (
        acc +
        item.totales.reduce((sumaTotales, total) => sumaTotales + total, 0)
      );
    }, 0);
  };

  return (
    <div className={styles.principal}>
      <button
        className={styles.button}
        onClick={() => handleNavigation("/cerrarSesion")}
      >
        Cerrar CerrarSesion
      </button>

      <button onClick={() => handleNavigation("/ingreso")}>Ingreso</button>
      <button onClick={() => handleNavigation("/paciente-historial")}>
        clientes
      </button>
      <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
      <h1>Fechas</h1>
      <input
        type="date"
        value={satrtDate}
        onChange={(e) => setSatrtDate(e.target.value)}
        className={styles.fechaInput}
      />
      <input
        className={styles.fechaInput}
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={fetchData}>buscar</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {console.log(item, "estoy en elitem")}
            <ul>
              {item.conceptos.map((conceptos, conceptosIndex) => (
                <li key={conceptosIndex}>Concepto: {conceptos}</li>
              ))}
            </ul>
            <ul>
              {item.totales.map((total, totalesIndex) => (
                <li key={totalesIndex}>Total: $ {total}</li>
              ))}
            </ul>
            <ul>DNI:{item.documento}</ul>
          </li>
        ))}

        {/* Mostrar la suma total al final de la lista */}
        <li>
          <strong>
            Suma total de todos los totales: ${calcularSumaTotal()}
          </strong>
        </li>
      </ul>
    </div>
  );
}

export default Fechas;
