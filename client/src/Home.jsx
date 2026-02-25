import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
const Home = () => {
  const [name, setName] = useState("");
  const { data: pokemon, loading, error, fetchData } = useFetch();

  const handleClick = () => {
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`);
  };
  return (
    <>
      <div>
        <div>
          {loading && <p> loading...</p>}
          {error && <p>{error}</p>}
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <button onClick={handleClick}>click</button>
        </div>

        {pokemon && <img src={pokemon.sprites.front_default}></img>}
      </div>
    </>
  );
};

export default Home;
