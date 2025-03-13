// Ejemplo de protección en React
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { useState } from "react";
import api from "../api";
import CerrarSesion from "./cerrarSesion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigation = (ruta) => {
    navigate(ruta);
  };
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
    rol: "usuario", // Valor predeterminado
  });

  const [mensaje, setMensaje] = useState(null);

  // Manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/crearUsuario", formData); // Ajusta la ruta si es diferente
      setMensaje("Usuario creado con éxito");
      console.log("Respuesta del servidor:", response.data);
      // Limpia el formulario después de crear el usuario
      setFormData({
        usuario: "",
        contraseña: "",
        rol: "",
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMensaje("Hubo un error al crear el usuario");
    }
  };

  const { usuario } = useContext(AuthContext);
  console.log(usuario, "usuario");
  if (!usuario) {
    return <p>Cargando...</p>; // Mostrar mientras se cargan los datos
  }

  if (usuario !== "admin") {
    return <p>No tienes permisos para ver esta página</p>;
  }

  return (
    <div>
      <CerrarSesion />
      <button onClick={() => handleNavigation("/ingreso")}>Ingreso</button>
      <button onClick={() => handleNavigation("/paciente-historial")}>
        clientes
      </button>
      <button onClick={() => handleNavigation("/buscar-eventos")}>
        Fechas
      </button>
      <h1>Panel de Administrador</h1>
      <h2>Crear Usuario</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Rol:</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            required
          >
            <option value="usuario">usuario</option>
            <option value="admin">administrador</option>
          </select>
        </div>

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default Dashboard;
