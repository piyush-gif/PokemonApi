import useFetch from "./useFetch";
import useEvolution from "./useEvolution";
const Home = () => {
  const {
    name,
    setName,
    pokeData,
    error,
    showDetails,
    setShowDetails,
    handleClick,
  } = useFetch();
  
  const { evolve, evoError, fetchEvo } = useEvolution();
  
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
      <button onClick={() => fetchEvo(name)}>Evolve?</button>
      </div>
      {error && <p>{error}</p>}
      {evoError && <p>{evoError}</p>}
      {pokeData && (
        <div className="poke-name">
          <h2>{pokeData.name}</h2>
          <img
            src={pokeData.sprites.front_default}
            alt={pokeData.name}/>
          <button onClick={() => setShowDetails(!showDetails)}>
             {showDetails ? "Hide Details" : "Show Details"}
             </button>
            {showDetails && (
              <div>
                <p>Height: {pokeData.height}</p>
                <p>Weight: {pokeData.weight}</p>
                <p>Base experience: {pokeData.base_experience}</p>
                <p>Type: {pokeData.types.map((t) => t.type.name)}</p>
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
      
    </>
   );
}
 
export default Home;