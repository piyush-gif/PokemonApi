import PokemonCard from './PokemonCard';
import useFetch from './useFetch';
import useRequest from './useRequest';
import { useState , useEffect} from 'react';
const PokeDex = () => {
  const {data, loading, error}  = useFetch('http://localhost:3000/pokemons');
  const {send, reLoading, reError} = useRequest();
  const [pokemon, setPokemon] = useState([]);

  const handleDelete = async(id) =>{
    setPokemon(data => data.filter(d => d.id !== id));
    await send(`http://localhost:3000/pokemons/${id}`, {method : "DELETE"});
  } 

  useEffect(()  => {
    if(data) setPokemon(data);
  },[data]);
 
  return (
    <div>
      <div className='input'>
        <p>hello this is the PokeDex</p>
        <p>Search a pokemon</p>
        <input/>
        <div className='pokemon-container'>
          {loading && <p> Loading ...</p>}
          {error && <p> Error found!</p>}
          {pokemon?.map((poke) => ( 
            <PokemonCard 
              key={poke.id} 
              pokemon={poke}
              onDelete={() => handleDelete(poke.id)}
            />
          ))}
          {reLoading && <p> Deleting...</p>}
          {reError && <p> Error Deleting!</p>}
        </div>
      </div>
    </div>
  )
};

export default PokeDex;
