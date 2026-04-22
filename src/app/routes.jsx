import { Routes, Route, Navigate } from "react-router-dom";
import GamesPage from "../features/games/pages/GamesPage";
import GameDetailPage from "../features/games/pages/GameDetailPage";
import Login from "../Pages/Login";
import PrivateRoute from "../routes/PrivateRoute";
import Animaciones from "../Pages/Animaciones";

function AppRoutes() {
  return (
    <Routes>
      {/* 🔁 REDIRECCIÓN INICIAL */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 🔓 Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/animations" element={<Animaciones />} />
      <Route path="/games" element={<GamesPage />} />

      {/* 🔒 Ruta protegida */}
      <Route
        path="/game/:id"
        element={
          <PrivateRoute>
            <GameDetailPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;