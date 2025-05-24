import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const totalItems = useSelector((state) => state.pokedex.totalItems);

  return ( 
    <nav className="navbar">
      <h1>Pokemon World</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
        <span className="total-items">Total: {totalItems}</span>
      </div>
    </nav>
  );
}

export default NavBar;
