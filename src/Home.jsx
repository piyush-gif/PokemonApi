import { useState } from "react";

const Home = () => {
  
  const [name, setName] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [error, setError] = useState(null);
  const [evolve, setEvolve]=useState(null);

  const handleClick =() =>{
    const trimmedName=name.trim().toLowerCase();

    if (trimmedName === ''){
      setError("Please enter a valid Pokemon name.")
      setPokeData(null);
      return;
    }
    setEvolve(null);
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
  const secondHandleClick = () => {
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`,{  
    }).then((res)=> {
      if(!res.ok){
        throw Error ("There's no futher evolution for this pokemon");
      }
      return res.json();
    }).then((data) => {
      const speciesUrl= data.evolution_chain.url;
      
      return fetch(speciesUrl)
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
      setEvolve(data);
    })
    .catch((err) => {
      setError(err.message);
    })
  }
  return ( 
    <> 
    <div className="basic">
      <p>Welcome</p>
      <p>Enter the name of the pokemon</p>
      <input 
      type="text" 
      required
      value = {name} 
      onChange={(e) => setName(e.target.value)}></input>

      <button onClick={handleClick}>Enter</button>
      </div>
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
      {evolve && 
      <div className="evo">
        <h2>Evolution Chain</h2>
        <ul>
          <li>{evolve.chain.species.name}</li>
          {evolve.chain.evolves_to.map((e1) => (
            <li key={e1.species.name}>
            {e1.species.name}
            {e1.evolves_to.map((e2) => (
            <ul key={e2.species.name}>
              <li>→ {e2.species.name}</li>
            </ul>
            ))}
          </li>
        ))}
      </ul>
      
      </div>}
      <div className="evolve-btn">
        <button onClick={secondHandleClick}>Evolve?</button>
      </div>
    </>
   );
}
 
export default Home;