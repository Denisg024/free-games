import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Animaciones.css";

export default function Animaciones() {
  const navigate = useNavigate();

  // 🎛 Control de velocidad (punto 1)
  const [speed, setSpeed] = useState(0.8);

  // 🔢 Loader (punto 4)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animaciones-container">

      {/* 🔙 Botón volver */}
      <button className="back-btn" onClick={() => navigate("/login")}>
        ⬅ Volver
      </button>

      <h1 className="anim-title">✨ Animaciones</h1>

      {/* 🔹 1. TARJETA */}
      <div className="anim-section">
        <h2>1. Tarjeta animada</h2>

        <div className="anim-content">
          <motion.div
            key={speed}
            className="anim-card"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: speed }}
          >
            Aparece con opacidad y se desliza desde abajo
          </motion.div>

          <div className="speed-buttons">
            <button onClick={() => setSpeed(0.3)}>⚡ Rápida</button>
            <button onClick={() => setSpeed(0.8)}>🚀 Normal</button>
            <button onClick={() => setSpeed(1.5)}>🐢 Lenta</button>
          </div>
        </div>
      </div>

      {/* 🔹 2. BOTÓN */}
      <div className="anim-section">
        <h2>2. Botón interactivo</h2>

        <div className="anim-content">
          <motion.button
            className="anim-button"
            whileTap={{ scale: 0.9 }}
          >
            Presióname
          </motion.button>
        </div>
      </div>

      {/* 🔹 3. DRAG */}
      <div className="anim-section">
        <h2>3. Cuadrado draggable</h2>

        <div className="anim-content">
          <motion.div
            className="drag-box"
            drag
            whileDrag={{ scale: 1.1 }}
          >
            Drag
          </motion.div>
        </div>
      </div>

      {/* 🔹 4. LOADER */}
      <div className="anim-section">
        <h2>4. Barra de carga</h2>

        <div className="anim-content">
          <div className="loader-container">
            <div
              className="loader-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>{progress}%</p>
        </div>
      </div>

    </div>
  );
}