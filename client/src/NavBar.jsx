import { Link } from "react-router-dom";
import useAuthStore from "./store/authStore";

const NavBar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/pokedex">Pokedex</Link>
      {user ? (
        <Link to="/profile">{user.username}</Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
