import { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import { useState } from "react";
import api from "../api";
import CerrarSesion from "./cerrarSesion";
import { useNavigate } from "react-router-dom";
import styles from "../moduls/dashboard.module.css";

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
      setFormData(
        {
          usuario: "",
          contraseña: "",
          rol: "",
        },
        cargarUsuarios()
      );
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
    return (
      <>
        <p>No tienes permisos para ver esta página</p>
        <button onClick={() => handleNavigation("/ingreso")}>Ingreso</button>
      </>
    );
  }

  const cargarUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    const getUsuarios = async () => {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    };
    getUsuarios();
  }, []);
  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await api.delete(`/eliminarusuario/${id}`);
        cargarUsuarios(); // Recargar usuarios después de eliminar
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error al eliminar el usuario");
      }
    }
  };

  return (
    <div>
      <button onClick={() => handleNavigation("/cerrarSesion")}>
        {" "}
        Cerrar CerrarSesion
      </button>
      <button onClick={() => handleNavigation("/ingreso")}>Ingreso</button>
      <button onClick={() => handleNavigation("/paciente-historial")}>
        clientes
      </button>
      <button onClick={() => handleNavigation("/buscar-eventos")}>
        Fechas
      </button>
      <div className={styles.cabecera}>
        <h1>Panel de Administrador</h1>
        <h2>Crear Usuario :</h2>
        {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.usuario}>Usuario:</label>
            <input
              className={styles.input}
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className={styles.contraseña}>Contraseña:</label>
            <input
              className={styles.input}
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className={styles.rol}>Rol:</label>
            <select
              className={styles.input}
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
      <div className={styles.listados}>
        <h2>Listados de usuarios : </h2>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.usuario}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button
                    className={styles.bX}
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
