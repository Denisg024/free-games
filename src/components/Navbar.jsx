import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Gamepad2, Search } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 1. Estado local para el input
  const [searchInput, setSearchInput] = useState("");

  // 2. Sincronizar el input con la URL al cargar o cambiar parámetros
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

      // 3. Usar navigate con objeto para mantener la ruta actual si es necesario
      // O navegar a "/" si quieres que siempre sea la home
      navigate({ search: newParams.toString() });
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <Gamepad2 className="logo-icon" size={28} />
          <span className="logo-text">
            Free<span className="logo-text-accent">Games</span>
          </span>
        </Link>

        {/* BUSCADOR */}
        <div className="navbar-search-wrapper">
          <Search className="search-icon" size={20} />

          <input
            type="text"
            className="navbar-search-input"
            placeholder="Buscar juegos..."
            value={searchInput} // 4. Vincular valor al estado
            onChange={handleChange}
            onKeyDown={handleSearch}
          />
        </div>

        {/* CATEGORIAS */}
        <div className="navbar-links">
          <Link to="/?category=shooter" className="nav-link">
            Shooters
          </Link>
          <Link to="/?category=mmorpg" className="nav-link">
            MMORPG
          </Link>
          <Link to="/?category=strategy" className="nav-link">
            Estrategia
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;