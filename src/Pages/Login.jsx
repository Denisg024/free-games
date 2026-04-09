import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground";
import "../styles/Login.css";

export default function Login() {
  const { login, register, token } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // 🔐 Si ya hay sesión, redirige
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

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

      <div className="login-container">
        <div className="login-box">
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

          <button className="login-btn" onClick={handleLogin}>
            Ingresar
          </button>

          <button className="register-btn" onClick={handleRegister}>
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
}