import { useEffect } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import Pokedex from "./PokeDex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Register from "./Register";
import useFetch from "../hooks/useFetch";
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";
import PokemonDetail from "./PokemonDetail";

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
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:id" element={<PokemonDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
