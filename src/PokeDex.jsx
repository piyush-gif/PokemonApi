import {useEffect, useState} from 'react';

const PokeDex = () => {
  const [error, setError] = useState(null);
  const [cards, setCard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetch('http://localhost:8000/pokemons')
    .then((res) => {
      if(!res) {
        throw new Error('Failed to fetch the data');
        
      }
      return res.json();
    })
    .then((data) => {
      setCard(data.pokemons || data);
      setLoading(false);
    })
    .catch((err) =>{
      setError(err.message);
      setLoading(false);
    })
  },[])
   if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete= (id) => {
    fetch(`http://localhost:8000/pokemons/${id}`,{
      method: 'DELETE'
    })
    .then((res) =>{
      if(!res.ok){
        throw new Error ('Delete Failed');
        
      }setCard(cards.filter(card => card.id !== id));
    }) 
    .catch(err => {
      console.error('Delete error:', err);
      setError('Failed to delete Pokémon');
    });
  }
  return ( 
    <div className="pokedex-container">
      {cards.map((card) => (
        <div className="pokemon-card" key={card.id || card.name}>
          <h3>{card.name}</h3>
          <p>Height: {card.height}</p> 
          <p>Weight: {card.weight}</p> 
          <p>Base XP: {card.base_experience}</p>
          <p>Type: <span className={`type-${card.type}`}>{card.type}</span></p>
          <button onClick={() => handleDelete(card.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
 
export default PokeDex;