import { Link } from "react-router-dom";

function GameCard({ game }) {

  return (

    <div className="card">

      <img src={game.thumbnail} alt={game.title} />

      <h3>{game.title}</h3>

      <p>{game.genre}</p>

      <Link to={`/game/${game.id}`}>
        <button>Ver Detalle</button>
      </Link>

    </div>

  );
}

export default GameCard;