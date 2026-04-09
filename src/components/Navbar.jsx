import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Gamepad2, Search, Menu, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // 👈 nuevo

  const { token, user, logout } = useAuth();

  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchInput.trim();
      const newParams = new URLSearchParams(searchParams);

      if (query !== "") newParams.set("search", query);
      else newParams.delete("search");

      navigate({ search: newParams.toString() });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* CONTENIDO */}
        <div className={`navbar-content ${menuOpen ? "active" : ""}`}>

          <div className="navbar-search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Buscar juegos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="navbar-links">
            <Link to={getCategoryLink("shooter")} className="nav-link">Shooters</Link>
            <Link to={getCategoryLink("mmorpg")} className="nav-link">MMORPG</Link>
            <Link to={getCategoryLink("strategy")} className="nav-link">Estrategia</Link>

            {token && (
              <>
                <span className="user-name">👤 {user}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;