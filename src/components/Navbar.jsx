import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Gamepad2, Search } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  // Sincronizar el input con la URL al cargar
  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchInput.trim();
      const newParams = new URLSearchParams(searchParams);

      if (query !== "") {
        newParams.set("search", query);
      } else {
        newParams.delete("search");
      }

      navigate({ search: newParams.toString() });
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Función auxiliar para construir links de categoría manteniendo la búsqueda
  const getCategoryLink = (category) => {
    const currentSearch = searchParams.get("search");
    const params = new URLSearchParams();
    params.set("category", category);
    if (currentSearch) params.set("search", currentSearch);
    return `?${params.toString()}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Gamepad2 className="logo-icon" size={28} />
          <span className="logo-text">
            Free<span className="logo-text-accent">Games</span>
          </span>
        </Link>

        <div className="navbar-search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Buscar juegos..."
            value={searchInput}
            onChange={handleChange}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="navbar-links">
          {/* Usamos la función para mantener la búsqueda si existe */}
          <Link to={getCategoryLink("shooter")} className="nav-link">Shooters</Link>
          <Link to={getCategoryLink("mmorpg")} className="nav-link">MMORPG</Link>
          <Link to={getCategoryLink("strategy")} className="nav-link">Estrategia</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;