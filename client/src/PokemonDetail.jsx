import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGet, loading, error } = useFetch();
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async () => {
    const data = await handleGet(`http://localhost:8000/pokedex/${id}`);
    if (data) setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="pokemon-detail-page">
      <button onClick={() => navigate("/pokedex")}>Back</button>
      <div className="pokemon-detail-card">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <h1>
          #{pokemon.id}{" "}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <div className="pokemon-types">
          {pokemon.types.map((t) => (
            <span key={t} className={`type ${t}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          ))}
        </div>
        <div className="pokemon-info">
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
        <div className="pokemon-stats">
          <h2>Stats</h2>
          {Object.entries(pokemon.stats).map(([stat, value]) => (
            <div key={stat} className="stat-row">
              <span>{stat.toUpperCase()}</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${(value / 255) * 100}%` }}
                />
              </div>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="pokemon-abilities">
          <h2>Abilities</h2>
          {pokemon.abilities.map((a) => (
            <span key={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</span>
          ))}
        </div>
        <div className="pokemon-moves">
          <h2>Moves</h2>
          <div className="moves-grid">
            {pokemon.moves.slice(0, 20).map((m) => (
              <span key={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
