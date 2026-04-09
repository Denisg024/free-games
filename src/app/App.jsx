import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppRoutes from "./routes";
import { AuthProvider } from "../Context/AuthContext";

function Layout() {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {location.pathname !== "/login" && <Navbar />}

      <div style={{ flex: 1 }}>
        <AppRoutes />
      </div>

      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;