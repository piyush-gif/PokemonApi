import { useState } from "react";

const Home = () => {
  const [name, setName] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [error, setError] = useState(null);
  const handleClick =() =>{
    
    const trimmedName=name.trim().toLowerCase();

    if (trimmedName === ''){
      setError("Please enter a valid Pokemon name.")
      setPokeData(null);
      return;
    }
    setError(null);
    setPokeData(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`,{
    }).then((res) => {
      if(!res.ok){
        throw Error ('Count not fetch the data from that resource, Enter a valid Pokemon name');
      }
      return res.json()
    }).then((data) => {
      setPokeData(data);
    })
    .catch((err)=>{
      setError(err.message);
    })
  }
  return ( 
    <> 
      <p>Welcome</p>
      <label></label>
      <p>Enter the name of the pokemon</p>
      <input 
      type="text" 
      required
      value = {name} 
      onChange={(e) => setName(e.target.value)}></input>

      <button onClick={handleClick}>Enter</button>
      {error && 
        <p>{error}</p>
      }
      {pokeData && (
        <div className="poke-name">
          <h2>{pokeData.name}</h2>
          <img
            src={pokeData.sprites.front_default}
            alt={pokeData.name}
          />
        </div>
      )}
      
    </>
   );
}
 
export default Home;