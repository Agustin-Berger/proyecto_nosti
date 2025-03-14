import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CerrarSesion from "./cerrarSesion";
import styles from "../moduls/ingreso.module.css";

import api from "../api";

function Ingreso() {
  const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
  const [data, setData] = useState([]);
  const [nuevaEntrada, setNuevaEntrada] = useState({
    fecha: "",
    totales: [""],
    laboratorio: "",
    documento: "",
    conceptos: [""],
    anotacion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaEntrada({ ...nuevaEntrada, [name]: value });
  };

  const navigate = useNavigate();
  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (
      nuevaEntrada.totales.length !== nuevaEntrada.conceptos.length ||
      nuevaEntrada.conceptos.length !== nuevaEntrada.totales.length
    ) {
      setError(
        "La cantidad de totales debe coincidir con la cantidad de conceptos."
      );
      return;
    }
    try {
      setError("");
      console.log("Nueva Entrada:", nuevaEntrada);
      const response = await api.post("/ventas", nuevaEntrada);
      console.log("Entrada creada:", response.data);
      // Agregar nueva entrada a la lista
      setData((prevData) => [...prevData, response.data]);
      // Resetear el formulario
      setNuevaEntrada({
        fecha: "",
        totales: [""],
        laboratorio: "",
        documento: "",
        conceptos: [""],
        anotacion: "",
      });
    } catch (error) {
      console.error("Error al crear la entrada:", error, setNuevaEntrada);
    }
  };
  const handleInputTotalChange = (e, index) => {
    const updatedTotales = [...nuevaEntrada.totales];
    updatedTotales[index] = e.target.value;
    setNuevaEntrada({ ...nuevaEntrada, totales: updatedTotales });
  };
  const handleInputConceptoChange = (e, index) => {
    const updateConceptos = [...nuevaEntrada.conceptos];
    updateConceptos[index] = e.target.value;
    setNuevaEntrada({ ...nuevaEntrada, conceptos: updateConceptos });
  };

  const addInputTotal = () => {
    console.log("entre a ejecutar el total");
    if (nuevaEntrada.totales.length < 4) {
      setNuevaEntrada({
        ...nuevaEntrada,
        totales: [...nuevaEntrada.totales, ""],
      });
      console.log("agregado");
    }
  };
  const addInputConcepto = () => {
    if (nuevaEntrada.conceptos.length < 4) {
      setNuevaEntrada({
        ...nuevaEntrada,
        conceptos: [...nuevaEntrada.conceptos, ""],
      });
    }
  };
  // Eliminar un Total
  const removeLastTotal = () => {
    if (nuevaEntrada.totales.length > 1) {
      const updatedTotales = nuevaEntrada.totales.slice(0, -1);
      setNuevaEntrada({ ...nuevaEntrada, totales: updatedTotales });
    }
  };

  // Eliminar un Concepto
  const removeLastConcepto = () => {
    if (nuevaEntrada.conceptos.length > 1) {
      const updatedConceptos = nuevaEntrada.conceptos.slice(0, -1);
      setNuevaEntrada({ ...nuevaEntrada, conceptos: updatedConceptos });
    }
  };
  return (
    <div>
      <div className={styles.cabecera}>
        <button
          className={styles.button}
          onClick={() => handleNavigation("/cerrarSesion")}
        >
          Cerrar CerrarSesion
        </button>

        <button
          className={styles.button}
          onClick={() => handleNavigation("/buscar-eventos")}
        >
          fechas
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigation("/paciente-historial")}
        >
          clientes
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigation("/dashboard")}
        >
          Dashboard
        </button>
      </div>
      <h1 className={styles.h1}>Agregar Nueva Entrada</h1>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label className={styles.fecha}>
          Fecha:
          <input
            className={styles.fechaInput}
            type="date"
            name="fecha"
            value={nuevaEntrada.fecha}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.documento}>
          Documento:
          <input
            className={styles.input}
            placeholder="Documento"
            type="text"
            name="documento"
            value={nuevaEntrada.documento}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className={styles.totales}>
          {nuevaEntrada.totales.map((total, index) => (
            <label key={index} className={styles.totales}>
              <input
                className={styles.input}
                placeholder="Monto"
                type="number"
                name={`totales[${index}]`}
                value={total}
                onChange={(e) => handleInputTotalChange(e, index)}
                required
              />
            </label>
          ))}
        </div>
        <div>
          <button
            className={styles.button}
            type="button"
            onClick={addInputTotal}
            disabled={nuevaEntrada.totales.length >= 4}
          >
            + Importe
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={removeLastTotal}
            disabled={nuevaEntrada.totales.length <= 1}
          >
            - Importe
          </button>
        </div>
        {nuevaEntrada.totales.length >= 4 && (
          <p>No puedes agregar más de 4 importes.</p>
        )}
        <div className={styles.conceptos}>
          {nuevaEntrada.conceptos.map((concepto, index) => (
            <label key={index} className={styles.conceptos}>
              <select
                className={styles.input}
                name={`conceptos[${index}]`}
                value={concepto}
                onChange={(e) => handleInputConceptoChange(e, index)}
                required
              >
                <option value="" disabled>
                  Concepto
                </option>
                <option value="Estampillas">Estampillas</option>
                <option value="Coseguros">Coseguros</option>
                <option value="No autorizados">No autorizados</option>
                <option value="Particular">Particular</option>
                <option value="Otros">Otros</option>
              </select>
            </label>
          ))}
        </div>
        <div>
          <button
            className={styles.button}
            type="button"
            onClick={addInputConcepto}
            disabled={nuevaEntrada.conceptos.length >= 4}
          >
            + Concepto
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={removeLastConcepto}
            disabled={nuevaEntrada.conceptos.length < 1}
          >
            - Concepto
          </button>
        </div>
        {nuevaEntrada.conceptos.length >= 4 && (
          <p>No puedes agregar más de 4 conceptos.</p>
        )}
        <label className={styles.laboratorio}>
          <input
            className={styles.input}
            placeholder="Laboratorio"
            type="text"
            name="laboratorio"
            value={nuevaEntrada.laboratorio}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={styles.anotacion}>
          <textarea
            className={styles.input}
            placeholder="Anotacion"
            type="text"
            name="anotacion"
            value={nuevaEntrada.anotacion}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Enviar
        </button>
        {/* Mostrar el mensaje de error si existe */}
        {error && (
          <p className={styles.error} style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Ingreso;
