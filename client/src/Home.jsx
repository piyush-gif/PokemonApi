import { useState } from "react";
import useRequest from "./useRequest";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const {send , reLoading, reError} = useRequest();

  const handleSearch = async (name) => {
    if(name === "") return;
    setLoading(true);
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if(!response.ok) throw Error("No response from the server");
      const data = await response.json();
      setData(data);
      setError(false);
    }
    catch(err){
      setError(err);
      setData(null);
      console.error(`There's an error ${err}`);
    }
    finally{
      setLoading(false);
    }
  }

  const handleSave = async (data) => {
    if (!data) return;
    const pokemonToSave = {
    Pokemon_id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience
  };
    const saved = await send (`http://localhost:3000/pokemons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify(pokemonToSave)
    });
    console.log("Saved response:", saved);
  }

  return(
    <div className="home-container">
      <div className="search-section">
        <img className="snorlax" src="/images/snorlax.png" alt="Snorlax"/>
        <h1>Welcome to Pokemon World!</h1>
        <p>Enter the pokemon name</p>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
        <button onClick={() => handleSearch(name)}>Search</button>
        <button onClick={() => handleSave(data)}> {reLoading ? "Saving..." : "Save"}</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Pokemon not found!</p>}
        {reError && <p>Error saving data</p>}
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