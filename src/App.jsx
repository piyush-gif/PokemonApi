import NavBar from './NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PokeDex from './PokeDex';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector((state) => state.theme.mode); 

  return (
    <div className={`app ${mode}`}> 
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
