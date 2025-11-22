import { useState } from "react";
import useFetch from "./useFetch";
import snorlax from "../public/images/snorlax.png";
const Home = () => {
  const [name, setName] = useState("");
  const [searchName, setSeatchName] = useState("");
  const {data, loading, error} = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
  
  const handleClick = () => {
    setSeatchName(name.toLowerCase());
  }
  const handleSave = () => {

    const PokeData = {
      name:data.name,
      id: data.id,
      sprite:data.sprites.front_default,
      types: data.types.map(data=> data.type.name),
      height:data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      abilities: data.abilities.map(ability=> ability.ability.name),
      stats: data.stats.map(stat =>({
        name : stat.stat.name,
        value: stat.base_stat
      }))
    };

    fetch('http://localhost:3000/pokemons',{
      method : 'POST',
      headers: {  "Content-Type" : "application/json"},
      body: JSON.stringify(PokeData)
    })
  }
   return(
    <div className="home-container">
      <div className="search-section">
        <img className="snorlax" src= {snorlax}/>
        <h1>Welcome to Pokemon World!</h1>
        
        <p>Enter the pokemon name</p>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleClick}>Search</button>
        <button onClick={handleSave}>Save</button>
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