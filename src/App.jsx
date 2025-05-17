import './App.css'
import NavBar from './NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PokeDex from './PokeDex';

function App() {

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Pokedex" element={<PokeDex />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
