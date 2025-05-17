import { Link } from "react-router-dom";
const NavBar = () => {
  return ( 
    <nav class="navbar">
      <h1>pokemon world</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/PokeDex">Pokedex</Link>
      </div>
    </nav>

   );
}
 
export default NavBar;