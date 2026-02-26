import Home from "./Home";
import NavBar from "./NavBar";
import Pokedex from "./PokeDex";
import "../style/homePage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
