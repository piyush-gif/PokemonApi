import PokemonCard from "./PokemonCard";
import useFetch from "./useFetch";
import useRequest from "./useRequest";
import { useState, useEffect, useContext } from "react";
import { CountContext } from "./CountContext";
const PokeDex = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/pokemons");
  const { send, reLoading, reError } = useRequest();
  const [pokemon, setPokemon] = useState([]);
  const { count, setCount } = useContext(CountContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 3;
  const startPage = (currentPage - 1) * itemPerPage;
  const endPage = startPage + itemPerPage;
  const pagination = pokemon.slice(startPage, endPage);

  const handleDelete = async (id) => {
    setPokemon((data) => data.filter((d) => d.id !== id));
    await send(`http://localhost:3000/pokemons/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    if (data) setPokemon(data);
    setCount(pokemon.length);
  }, [data]);

  return (
    <div>
      <div className="input">
        <p>PokeDex</p>
        <p>Search a pokemon</p>
        <input />
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          disabled={currentPage === 1}
        >
          previous
        </button>
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          disabled={endPage >= pokemon.length}
        >
          next
        </button>
        <div className="pokemon-container">
          {loading && <p> Loading ...</p>}
          {error && <p> Error found!</p>}
          {pagination?.map((poke) => (
            <PokemonCard
              key={poke.id}
              pokemon={poke}
              onDelete={() => handleDelete(poke.id)}
            />
          ))}
          {reLoading && <p> Deleting...</p>}
          {reError && <p> Error Deleting!</p>}
        </div>
      </div>
    </div>
  );
};

export default PokeDex;
