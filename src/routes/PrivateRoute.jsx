import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return token ? children : <Navigate to="/login" />;
}