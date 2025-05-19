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
      setCard(data);
      setLoading(false);
    })
    .catch((err) =>{
      setError(err.message);
      setLoading(false);
    })
  },[])
   if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;
  return ( 
    <div className="pokedex-container">
      {cards.map((card , id) => (
        <div className="pokemon-card" key={id}>
          <h3>{card.name}</h3>
          <p>Height: {card.height}</p> 
          <p>Weight: {card.weight}</p> 
          <p>Base XP: {card.base_experience}</p>
          <p>Type: <span className={`type-${card.type}`}>{card.type}</span></p>
        </div>
      ))}
    </div>
  );
};
 
export default PokeDex;