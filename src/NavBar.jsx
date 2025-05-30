import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setTheme } from './themeSlice.js';

const NavBar = () => {
  const totalItems = useSelector((state) => state.pokedex.totalItems);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const location = useLocation();

  
  const isOnPokedexPage = location.pathname === '/PokeDex'; 
  const toggleTheme = () => {
    dispatch(setTheme(mode === 'light' ? 'dark' : 'light'));
  };

  return ( 
    <nav className="navbar">
      <h1>Pokemon World</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
        {totalItems && isOnPokedexPage &&( <span className="total-items">Total: {totalItems}</span>)}
        
        <button onClick={toggleTheme} className="theme-toggle">
          {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
