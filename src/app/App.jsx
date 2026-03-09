import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div>
        <h1></h1>
       
      </div>

      <AppRoutes />

    </BrowserRouter>
  );
}

export default App;