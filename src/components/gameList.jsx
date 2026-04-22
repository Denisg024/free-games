import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
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
  }, [searchQuery, categoryQuery]);

  // 🔥 LOADER ANIMADO (cumples punto 4)
  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
          style={{
            height: "6px",
            background: "#00ff99",
            borderRadius: "10px"
          }}
        />
        <p>Cargando juegos...</p>
      </div>
    );
  }

  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p>No se encontraron juegos.</p>
      ) : (
        games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.97 }}
          >
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default GameList;