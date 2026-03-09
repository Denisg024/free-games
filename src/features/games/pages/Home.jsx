import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Gamepad2 } from "lucide-react";
import { getGames } from "../api";
import "../styles/Home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔍 Parámetros de búsqueda:", searchParams.toString()); // LOG 1

      try {
        const data = await getGames(new URLSearchParams(searchParams));
        console.log("📦 Datos recibidos:", data); // LOG 2
        setGames(data.slice(0, 12));
      } catch (err) {
        console.error("❌ Error al cargar juegos:", err);
        setError("Hubo un error al cargar los juegos.");
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchParams]); // Dependencia correcta

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
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
          <Filter size={16} /> FILTROS
        </div>

        <div className="select-group">
          <select
            className="custom-select"
            value={searchParams.get("platform") || ""}
            onChange={(e) => handleFilterChange("platform", e.target.value)}
          >
            <option value="">Plataforma</option>
            <option value="pc">PC</option>
            <option value="browser">Web</option>
          </select>

          <select
            className="custom-select"
            value={searchParams.get("category") || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Categoría</option>
            <option value="mmorpg">MMORPG</option>
            <option value="shooter">Shooter</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>
      </section>

      <div className="games-grid">
        {loading ? (
          <div className="loading-state">
            <p>Cargando juegos...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
          </div>
        ) : games.length === 0 ? (
          <div className="empty-state">
            <Gamepad2 size={48} color="#ccc" />
            <p>No se encontraron juegos con estos filtros.</p>
          </div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <img 
                src={game.thumbnail} 
                alt={game.title} 
                loading="lazy" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
              <div className="card-info">
                <h3>{game.title}</h3>
                <span className="genre-badge">{game.genre}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;