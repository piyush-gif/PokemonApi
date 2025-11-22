import { useState } from "react";
import useFetch from "./useFetch";

const Home = () => {
  const [name, setName] = useState("");
  const [searchName, setSeatchName] = useState("charizard");
  const {data, loading, error} = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);
  
  const handleClick = () => {
    setSeatchName(name.toLowerCase());
  }
  const handleSave = () => {

    const PokeData = {
      name:data.name

    }
    fetch('http://localhost:3000/pokemons',{
      method : 'POST',
      headers: {  "Content-Type" : "application/json"},
      body: JSON.stringify(PokeData)
    })
  }
   return(
    <div>
      <div>
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
          <div>
            <h2>{data.name} #{data.id}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <img src={data.sprites.back_default} alt={data.name} />
            {data.sprites.front_shiny && <img src={data.sprites.front_shiny} alt={data.name} />}
            
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