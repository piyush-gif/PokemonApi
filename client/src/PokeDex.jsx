import PokemonCard from './PokemonCard';
import useFetch from './useFetch';
const PokeDex = () => {
  const {data, loading, error, setData}  = useFetch('http://localhost:3000/pokemons');


  const handleDelete = async (id) =>{
  }
 
  return (
    <div>
      <div className='input'>
        <p>hello this is the PokeDex</p>
        <p>Search a pokemon</p>
        <input/>
        <div className='pokemon-container'>
          {loading && <p> Loading ...</p>}
          {error && <p> error found!</p>}
          {data?.map((pokemon) => ( 
            <PokemonCard 
              key={pokemon.id} 
              pokemon={pokemon}
              onDelete={() => handleDelete(pokemon.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default PokeDex;
