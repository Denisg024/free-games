import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground";
import { motion } from "framer-motion";
import "../styles/Login.css";

export default function Login() {
  const { login, register, token } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // 🔐 Redirección si ya hay sesión
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  // ✅ Validaciones
  const validate = () => {
    if (user.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return false;
    }
    if (pass.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  // 🔑 Login
  const handleLogin = () => {
    if (!validate()) return;

    const success = login(user, pass);
    if (success) {
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  // 🆕 Registro
  const handleRegister = () => {
    if (!validate()) return;

    const result = register(user, pass);

    if (result.success) {
      setError("");
      alert("Usuario creado correctamente");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      {/* 🌌 Fondo con partículas */}
      <ParticlesBackground />

      <div className="top-buttons">
  <button onClick={() => navigate("/games")}>
    🎮 Ver Juegos
  </button>

  <button onClick={() => navigate("/animations")}>
    ✨ Animaciones
  </button>
</div>

      <div className="login-container">
        {/* 🎬 TARJETA ANIMADA */}
        <motion.div
          className="login-box"
          initial={{
            opacity: 0,
            y: 60,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="login-title">🎮 FreeGames</h2>

          {error && <p className="error-text">{error}</p>}

          <input
            className="login-input"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              className="login-input"
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Ocultar" : "Ver"}
            </span>
          </div>

          {/* 🔥 BOTÓN LOGIN ANIMADO */}
          <motion.button
            className="login-btn"
            onClick={handleLogin}
            whileTap={{ scale: 0.9 }}
          >
            Ingresar
          </motion.button>

          {/* 🔥 BOTÓN REGISTRO ANIMADO */}
          <motion.button
            className="register-btn"
            onClick={handleRegister}
            whileTap={{ scale: 0.9 }}
          >
            Registrarse
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}