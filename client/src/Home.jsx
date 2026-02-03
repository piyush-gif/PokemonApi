import { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchapi = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/charmander",
      );
      const data = await response.json();
      setPokemon(data);
    };
    fetchapi();
  }, []);

  const fetchPokemon = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}/`,
      {},
    );
    const data = await response.json();
    setPokemon(data);
    console.log(data);
  };

  return (
    <>
      <div>
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <button onClick={fetchPokemon}>click</button>
        </div>

        {pokemon && <img src={pokemon.sprites.front_default}></img>}
      </div>
    </>
  );
};

export default Home;
