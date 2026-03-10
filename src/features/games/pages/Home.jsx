import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Gamepad2, Search } from "lucide-react";
import "../styles/Home.css";

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const gamesPerPage = 12;

  const categoryParam = searchParams.get("category") || "";
  const platformParam = searchParams.get("platform") || "";

  // CARGAR JUEGOS
  useEffect(() => {

    const fetchGames = async () => {

      setLoading(true);

      try {

        let url = "https://www.freetogame.com/api/games";

        if (platformParam && categoryParam) {
          url = `https://www.freetogame.com/api/filter?platform=${platformParam}&category=${categoryParam}`;
        } 
        else if (platformParam) {
          url = `https://www.freetogame.com/api/games?platform=${platformParam}`;
        } 
        else if (categoryParam) {
          url = `https://www.freetogame.com/api/games?category=${categoryParam}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setGames(data);
        setFilteredGames(data);

      } catch (error) {

        console.error("Error cargando juegos", error);

      }

      setLoading(false);

    };

    fetchGames();

  }, [platformParam, categoryParam]);

  // BUSQUEDA
  useEffect(() => {

    const results = games.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredGames(results);
    setCurrentPage(1);

  }, [searchQuery, games]);

  // PAGINACIÓN
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  // CAMBIAR FILTROS
  const handleFilterChange = (key, value) => {

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  // LIMPIAR FILTROS
  const clearFilters = () => {

    setSearchParams({});
    setSearchQuery("");

  };

  return (

    <main className="home-container">

      <header className="home-header">
        <div className="title-wrapper">
          <Gamepad2 color="#00ff88" size={40} />
          <h1>Free Games</h1>
        </div>
      </header>

      <section className="filters-section">

        <div className="filters-label">
          <Filter size={16}/> FILTROS
        </div>

        {/* BUSCADOR */}

        <div className="search-wrapper">
          <Search size={18}/>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
          />
        </div>

        {/* FILTROS */}

        <div className="select-group">

          <select
            className="custom-select"
            value={platformParam}
            onChange={(e)=>handleFilterChange("platform",e.target.value)}
          >
            <option value="">Plataforma</option>
            <option value="pc">PC</option>
            <option value="browser">Web</option>
          </select>

          <select
            className="custom-select"
            value={categoryParam}
            onChange={(e)=>handleFilterChange("category",e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="mmorpg">MMORPG</option>
            <option value="shooter">Shooter</option>
            <option value="strategy">Strategy</option>
          </select>

        </div>

        {(searchQuery || categoryParam || platformParam) && (

          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar filtros
          </button>

        )}

      </section>

      {/* GRID */}

      <div className="games-grid">

        {loading ? (

          <p>Cargando juegos...</p>

        ) : currentGames.length === 0 ? (

          <p>No se encontraron juegos</p>

        ) : (

          currentGames.map((game)=>(
            <div key={game.id} className="game-card">

              <img src={game.thumbnail} alt={game.title}/>

              <div className="card-info">
                <h3>{game.title}</h3>
                <span className="genre-badge">{game.genre}</span>
              </div>

            </div>
          ))

        )}

      </div>

      {/* PAGINACIÓN */}

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={()=>setCurrentPage(currentPage-1)}
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={()=>setCurrentPage(currentPage+1)}
        >
          Siguiente
        </button>

      </div>

    </main>
  );
};

export default Home;