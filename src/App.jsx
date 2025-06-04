import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import PokeDex from './PokeDex';
import Popup from './popup';
import { ThemeProvider, useTheme } from './theme';

const ThemedApp = () => {
  const { mode } = useTheme();

  return (
    <div className={`app ${mode}`}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pokedex" element={<PokeDex />} />
        </Routes>
        <Popup />
      </Router>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
