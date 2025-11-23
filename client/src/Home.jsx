import { useState } from "react";
import useFetch from "./useFetch";
import snorlax from "../public/images/snorlax.png";

const Home = () => {
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [saveStatus, setSaveStatus] = useState(""); // For user feedback
  const {data, loading, error} = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
  
  const handleClick = () => {
    setSearchName(name.toLowerCase());
    setSaveStatus(""); // Clear previous save status
  }

  const handleSave = async () => {
    // Guard clause - only proceed if data exists
    if (!data) return;

    try {
      // Check if Pokemon already exists
      const checkResponse = await fetch(`http://localhost:3000/pokemons?id=${data.id}`);
      const existingPokemon = await checkResponse.json();
      
      if (existingPokemon && existingPokemon.length > 0) {
        setSaveStatus("This Pokemon is already in your Pokedex!");
        return;
      }

      // If not exists, save it
      const PokeData = {
        name: data.name,
        id: data.id,
        sprite: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };

      const saveResponse = await fetch('http://localhost:3000/pokemons', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PokeData)
      });

      if (!saveResponse.ok) throw new Error('Failed to save');
      
      setSaveStatus("Pokemon saved successfully!");
    } catch (err) {
      setSaveStatus("Failed to save Pokemon");
      console.error(err);
    }
  }

  return(
    <div className="home-container">
      <div className="search-section">
        <img className="snorlax" src={snorlax} alt="Snorlax"/>
        <h1>Welcome to Pokemon World!</h1>
        
        <p>Enter the pokemon name</p>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
        <button 
          onClick={handleSave} 
          disabled={!data || loading || error}
        >
          Save
        </button>
        {saveStatus && <p className="save-status">{saveStatus}</p>}
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Pokemon not found!</p>}
        
        {data && (
          <div className="pokemon-card">
            <h2>{data.name} #{data.id}</h2>
            <div className="pokemon-images">
              <img src={data.sprites.front_default} alt={data.name} />
            </div>
            
            <p>Type: {data.types.map(type => type.type.name).join(', ')}</p>
            <p>Height: {data.height / 10} m</p>
            <p>Weight: {data.weight / 10} kg</p>
            <p>Base Experience: {data.base_experience}</p>
            <p>Abilities: {data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            
            <h3>Stats</h3>
            {data.stats.map((stat, index) => (
              <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
            ))}
          </div>
        )}
      </div>
    </div>  
  )
}
 
export default Home;