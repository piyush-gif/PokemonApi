import { Link } from "react-router-dom";
import { CountContext } from "./CountContext";
import { useContext } from "react";
const NavBar = () => {
  const { count, setCount } = useContext(CountContext);
  return (
    <nav className="navbar">
      <h1>Pokemon World</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
        <p>Total count: {count} </p>
      </div>
    </nav>
  );
};

export default NavBar;
