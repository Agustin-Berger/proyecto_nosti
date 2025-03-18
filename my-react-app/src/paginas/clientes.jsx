//import "./App.css"; // Asegúrate de que la importación de estilos esté aquí
import { useState } from "react";
import styles from "../moduls/clientes.module.css";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Clientes() {
  const [data, setData] = useState([]);
  const [documento, setDocumento] = useState(""); // Inicializa vacío

  const fetchData = async () => {
    if (documento) {
      // Asegúrate de que el documento no esté vacío
      try {
        const response = await api.get(
          `/cliente?documento=${documento}` // Aquí pasas el parámetro
        );
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    } else {
      console.error("Por favor ingresa un número de documento válido.");
    }
    console.log(data, "llegue");
  };
  const navigate = useNavigate();
  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  return (
    <div>
      <button onClick={() => handleNavigation("/cerrarSesion")}>
        Cerrar CerrarSesion
      </button>
      <button onClick={() => handleNavigation("/ingreso")}>Ingreso</button>
      <button onClick={() => handleNavigation("/paciente-historial")}>
        Fechas
      </button>
      <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
      <div className={styles.cabecera}>
        <h1>Historial del paciente</h1>
        <label>
          Ingresa el número de documento:
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)} // Actualiza el estado con el valor del input
            placeholder="Ejemplo: 39815360"
          />
        </label>
        <button onClick={fetchData}>Buscar</button>{" "}
        {/* Botón para iniciar la búsqueda */}
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <li> Fecha :{item.fecha.substring(0, 10)}</li>
              <li>Laboratorio:{item.laboratorio}</li>
              <li>
                {item.totales.map((total, totalesIndex) => (
                  <li key={totalesIndex}>Total: $ {total}</li>
                ))}
              </li>

              {item.conceptos.map((concepto, conceptoIndex) => (
                <li key={conceptoIndex}>Concepto: {concepto}</li>
              ))}

              <li>Documento :{item.documento}</li>
              <li>Nota:{item.anotacion}</li>
              <li>____________</li>
            </li>
            // Ajusta esto según la estructura de tus datos
          ))}
        </ul>
      </div>
    </div>
  );
}
//fecha: e.fecha,
//total: e.total,
//laboratorio: e.laboratorio,
//concepto: e.concepto,
//documento: e.documento,
//anotacion: e.anotacion,
export default Clientes;
