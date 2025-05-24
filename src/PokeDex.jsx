import {useEffect, useState} from 'react';

const PokeDex = () => {
  const [error, setError] = useState(null);
  const [cards, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const limit = 2;
  useEffect(()=> {
    setLoading(true);
    fetch(`http://localhost:8000/pokemons?_page=${page}&_limit=${limit}`)
    .then((res) => {
      if(!res.ok) {
        throw new Error('Failed to fetch the data');
      }
      const totalItems = res.headers.get('X-Total-Count');
        
      if(totalItems) {
          setTotalPages(Math.ceil(totalItems / limit));
        }
      console.log(totalItems)
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
  },[page])
  

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
  };
   if (loading) return <div>Loading Pokémon...</div>;
   if (error) return <div>Error: {error}</div>;
 return (
    <div className="pokedex-wrapper">
      <div className="pokedex-container">
        {cards.map((card) => (
          <div className="pokemon-card" key={card.id || card.name}>
            <h3>{card.name}</h3>
            <img src={card.img} alt={card.name} />
            <p>Height: {card.height}</p>
            <p>Weight: {card.weight}</p>
            <p>Base XP: {card.base_experience}</p>
            <p>
              Type:
              {card.type.map((t) => (
                <span key={t} className={`type-${t}`}>
                  {' '}
                  {t}{' '}
                </span>
              ))}
            </p>
            <button onClick={() => handleDelete(card.id)}>delete</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ⬅
        </button>
        <span>
          Page {page}
          {totalPages && ` of ${totalPages}`}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={totalPages !== null && page >= totalPages}
        >
          ➡
        </button>
      </div>
    </div>
  );
};

 
export default PokeDex;