import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import PokeDex from './PokeDex.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pokedex" element={<PokeDex />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
