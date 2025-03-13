import axios from "axios";

const CerrarSesion = () => {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/cerrar-sesion",
        {},
        { withCredentials: true }
      );
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o a otra página
      window.location.href = "/"; // Ajusta según tu ruta
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};
export default CerrarSesion;
