import NavBar from './NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PokeDex from './PokeDex';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector((state) => state.theme.mode); // "light" or "dark"

  return (
    <div className={`app ${mode}`}> {/* This is where the class is applied */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pokedex" element={<PokeDex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
