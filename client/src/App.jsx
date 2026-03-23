import { useEffect } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import Pokedex from "./PokeDex";
import "../style/homePage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Register from "./Register";
import "../style/Register.css";
import "../style/index.css";
import "../style/login.css";
import "../style/NavBar.css";
import useFetch from "../hooks/useFetch";
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { handleGet } = useFetch();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const data = await handleGet("http://localhost:8000/me");
      if (data) {
        setUser(data);
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pokedex"
          element={
            <ProtectedRoute>
              <Pokedex />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
