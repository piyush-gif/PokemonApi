import PokemonCard from './PokemonCard';
import useFetch from './useFetch';
const PokeDex = () => {

  const {data, loading, error}  = useFetch('http://localhost:3000/pokemons');
  return (
    <div>
      <div className='input'>
        <p>hello this is the PokeDex</p>
        <input/>
        <div className='pokemon-container'>
          {loading && <p> Loading ...</p>}
          {error && <p> error found!</p>}
          {data && data.map((data) => ( 
            <PokemonCard key={data.id} pokemon = {data}/>
          ))}
        </div>
      </div>
    </div>
  )
};

export default PokeDex;
