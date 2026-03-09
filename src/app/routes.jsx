import { Routes, Route } from "react-router-dom";
import GamesPage from "../features/games/pages/GamesPage";
import GameDetailPage from "../features/games/pages/GameDetailPage";

function AppRoutes() {

  return (

    <Routes>

      <Route path="/" element={<GamesPage />} />

      <Route path="/game/:id" element={<GameDetailPage />} />

    </Routes>

  );

}

export default AppRoutes;