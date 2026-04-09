import { Routes, Route } from "react-router-dom";
import GamesPage from "../features/games/pages/GamesPage";
import GameDetailPage from "../features/games/pages/GameDetailPage";
import Login from "../Pages/Login";
import PrivateRoute from "../routes/PrivateRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <GamesPage />
          </PrivateRoute>
        }
      />

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