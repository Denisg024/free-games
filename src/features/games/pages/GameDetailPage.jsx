import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../gamesApi";

function GameDetailPage() {

  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {

    const loadGame = async () => {

      const data = await getGameById(id);
      setGame(data);

    };

    loadGame();

  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (

    <div className="detail">

      <h1>{game.title}</h1>

      <img src={game.thumbnail} />

      <p>{game.description}</p>

      <p><b>Genero:</b> {game.genre}</p>

      <p><b>Plataforma:</b> {game.platform}</p>

      <a href={game.game_url} target="_blank">
        <button>Jugar</button>
      </a>

    </div>

  );
}

export default GameDetailPage;