import PokemonCard from './PokemonCard';
import useFetch from './useFetch';
const PokeDex = () => {
  const {data, loading, error, setData}  = useFetch('http://localhost:3000/pokemons');


  const handleDelete = async (id) =>{
    setData(prev => prev.filter(p => p.id !== id));
    try{
      const res = await fetch(`http://localhost:3000/pokemons/${id}`, {method : 'DELETE'});
      if(!res.ok) throw Error('Delete failed');
    }
    catch(err){
      console.error(err);
    }
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
