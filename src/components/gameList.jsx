// GameList.jsx (O el componente donde muestras la lista)
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // 1. Obtener los parámetros de la URL
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  // 2. Efecto para llamar a la API cuando cambian los params
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        // Construir la URL con los query params
        let url = "https://tu-api.com/games";
        const params = new URLSearchParams();

        if (searchQuery) params.append("search", searchQuery);
        if (categoryQuery) params.append("category", categoryQuery);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchQuery, categoryQuery]); // Se ejecuta cuando cambia la búsqueda o categoría

  if (loading) return <div>Cargando juegos...</div>;

  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p>No se encontraron juegos.</p>
      ) : (
        games.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;