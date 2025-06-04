import useFetch from "./useFetch";
import React from "react";

const Home = () => {
  const {
    name,
    setName,
    pokeData,
    error,
    showDetails,
    handleClick,
    evolve, 
    evoError
  } = useFetch();
  
  const saveHandle= () => { 
    if(!pokeData) return ;
    const pokemonData={
      name:pokeData.name,
      height: pokeData.height,
      weight: pokeData.weight,
      base_experience: pokeData.base_experience,
      type: pokeData.types.map(t => t.type.name),
      img: pokeData.sprites.front_default
    }
    fetch('http://localhost:8000/pokemons',{
      method:'POST',
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(pokemonData),

    })
    .then((res) => {
      if(!res.ok) throw Error ("could not save the pokemon");
      return res.json();
    })
    .then((data) => alert(`Saved ${data.name}`))
    .catch((err) => console.error(err.message));
  };
  return ( 
    <div className="main"> 
    <img className= "snorlax" src='../public/images/snorlax.png'/>
    <div className="intro">
      <h1>Welcome</h1>
      <h2>to Pokemon World</h2>
      <p>Enter the name of the pokemon</p>
      
      <input 
      type="text" 
      required
      value = {name} 
      onChange={(e) => setName(e.target.value)}></input>

      <button onClick={handleClick}>Enter</button>
      <button onClick={saveHandle}>Save</button>
      </div>
      <div className="errors">
        {error && <p>{error}</p>}
        {evoError && <p>{evoError}</p>}
      </div>
      {pokeData && (
        <div className="poke-name">
          <h3>{pokeData.name}</h3>
          <img
            src={pokeData.sprites.front_default}
            alt={pokeData.name}/>
            <br></br>
            {showDetails && (
              <div>
                <p> 
                  Type:{' '} 
                  {pokeData.types.map((t) => (
                    <span key={t.type.name} className={`type-${t.type.name}`}>
                      {' '}
                      {t.type.name}{' '}
                    </span>
                  ))}
                </p>
              </div>
            )}
        </div>
      )}
      
      {evolve && 
      <div className="evo">
        <h2>Evolution Chain</h2>
        <ul>
          <li>{evolve.chain.species.name}</li>
          {evolve.chain.evolves_to.map((e1) => (
            <React.Fragment key={e1.species.name}>
           <li>{e1.species.name}</li>
            {e1.evolves_to.map((e2) => (
            <li key={e2.species.name}>
               {e2.species.name}
            </li>
            ))}
          </React.Fragment>
        ))}
       </ul>
      </div>}

    <div className="footer">
      <p>© 2025 Piyush Khadka.</p>
    </div>
    </div>
   );
}
 
export default Home;