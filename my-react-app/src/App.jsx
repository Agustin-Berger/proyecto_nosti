import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ingreso from "./paginas/ingreso";
import Fechas from "./paginas/fechas";
import Clientes from "./paginas/clientes";
import Login from "./paginas/inicio";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./privateRoute"; // Asegúrate de que la ruta sea correcta
import Dashboard from "./paginas/dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/ingreso"
            element={
              <PrivateRoute>
                <Ingreso />
              </PrivateRoute>
            }
          />
          <Route
            path="/buscar-eventos"
            element={
              <PrivateRoute>
                <Fechas />
              </PrivateRoute>
            }
          />
          <Route
            path="/paciente-historial"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
