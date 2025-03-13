import axios from "axios";

// Configurar el cliente Axios
const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

// Agregar un interceptor para incluir el token en las cabeceras

export default api;
