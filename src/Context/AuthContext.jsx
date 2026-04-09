import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📌 Obtener usuarios
  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // 📌 Cargar sesión
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // 📌 Registrar usuario
  const register = (username, password) => {
    const users = getUsers();

    const exists = users.find((u) => u.username === username);
    if (exists) {
      return { success: false, message: "El usuario ya existe" };
    }

    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);

    return { success: true };
  };

  // 📌 Login
  const login = (username, password) => {
    const users = getUsers();

    const userFound = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      const fakeToken = "abc123token";

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", username);

      setToken(fakeToken);
      setUser(username);

      return true;
    }

    return false;
  };

  // 📌 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);