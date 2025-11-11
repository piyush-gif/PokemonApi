import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="navbar">
      <h1>Pokemon World</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
      </div>
    </nav>
  );
};

export default NavBar;
