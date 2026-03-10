import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGames, getGamesByPlatform } from "../gamesApi";
import GameCard from "../components/GameCard";
import "../../../styles/GamesPage.css";
import error404 from "../../../assets/images/404.png";

function GamesPage() {

  const [games, setGames] = useState([]);
  const [params] = useSearchParams();

  // PARAMETROS DE LA URL
  const platform = params.get("platform");
  const search = params.get("search") || "";
  const category = params.get("category");

  // PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  // CARGAR JUEGOS
  useEffect(() => {

    const loadGames = async () => {

      let data;

      if (platform) {
        data = await getGamesByPlatform(platform);
      } else {
        data = await getGames();
      }

      setGames(data);
      setCurrentPage(1);

    };

    loadGames();

  }, [platform]);

  // FILTRAR JUEGOS
  const filteredGames = games
    .filter((game) => {
      if (!search) return true;
      return game.title.toLowerCase().includes(search.toLowerCase());
    })
    .filter((game) => {
      if (!category) return true;
      return game.genre.toLowerCase() === category.toLowerCase();
    });

  // CALCULAR PAGINACION
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // CAMBIAR PAGINA
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">

      <h1>Free Games</h1>

      {/* SI NO HAY RESULTADOS */}
      {filteredGames.length === 0 ? (

        <div className="no-results">

          <img
            src={error404}
            alt="Error 404"
            className="error-image"
          />

          <h2>No encontramos juegos</h2>

          <p>
            No hay resultados para "<strong>{search}</strong>"
          </p>

        </div>

      ) : (

        <>
          {/* GRID DE JUEGOS */}
          <div className="grid">
            {currentGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {/* PAGINACION */}
          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              Anterior
            </button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
            >
              Siguiente
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default GamesPage;