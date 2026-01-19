import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Home from "./Home.jsx";
import PokeDex from "./PokeDex.jsx";
import { CountContext } from "./CountContext.jsx";
import { useState } from "react";
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <CountContext.Provider value={{ count, setCount }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Pokedex" element={<PokeDex />} />
          </Routes>
        </Router>
      </CountContext.Provider>
    </div>
  );
};
export default App;
