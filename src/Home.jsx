import { useState } from "react";
import useFetch from "./useFetch";

const Home = () => {
  const [name, setName] = useState("charizard");
	
  const [searchName, setSeatchName] = useState("");
  const {data, loading, error} = useFetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`);

  const handleClick = () => {
    setSeatchName(name.toLowerCase());
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
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Pokemon not found!</p>}
        
        {data && (
          <div>
            <h2>{data.name}</h2>
            <img src={data.sprites} alt={data.name} />
          </div>
        )}
      </div>
    </div>  
  )
}
 
export default Home;