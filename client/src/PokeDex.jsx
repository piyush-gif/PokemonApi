import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const { handleGet, loading, error } = useFetch();
  const navigate = useNavigate();

  const types = [
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "normal",
  ];

  const fetchPokemon = async () => {
    let url = "http://localhost:8000/pokedex?";
    if (search) url += `search=${search}&`;
    if (type) url += `type=${type}`;
    const data = await handleGet(url);
    if (data) setPokemon(data);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPokemon();
    }, 400);
    return () => clearTimeout(delay);
  }, [search, type]);

  return (
    <div className="pokedex-page">
      <h1>Pokedex</h1>
      <div className="pokedex-filters">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pokemon..."
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="pokedex-grid">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="pokemon-card"
            onClick={() => navigate(`/pokedex/${p.id}`)}
          >
            <img src={p.sprite} alt={p.name} />
            <p>#{p.id}</p>
            <h3>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
            <div className="pokemon-types">
              {p.types.map((t) => (
                <span key={t} className={`type ${t}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
