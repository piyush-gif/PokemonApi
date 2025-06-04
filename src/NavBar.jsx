import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from './theme';

const NavBar = () => {
  const totalItems = useSelector((state) => state.pokedex.totalItems);
  const location = useLocation();
  const isOnPokedexPage = location.pathname === '/PokeDex';
  const { mode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h1>Pokemon World</h1>
      <div className="links">
        {totalItems && isOnPokedexPage && (
          <span className="total-items">Total: {totalItems}</span>
        )}
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
