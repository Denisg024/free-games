import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGames, getGamesByPlatform } from "../gamesApi";
import GameCard from "../components/GameCard";

function GamesPage() {

  const [games, setGames] = useState([]);
  const [params] = useSearchParams();

  const platform = params.get("platform");

  useEffect(() => {

    const loadGames = async () => {

      let data;

      if (platform) {
        data = await getGamesByPlatform(platform);
      } else {
        data = await getGames();
      }

      setGames(data);

    };

    loadGames();

  }, [platform]);

  return (

    <div className="container">

      <h1>Free Games</h1>

      <div className="grid">

        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}

      </div>

    </div>

  );
}

export default GamesPage;