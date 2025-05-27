import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setTotalItems } from './pokedexSlice';
const PokeDex = () => {
  const [error, setError] = useState(null);
  const [cards, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [info, setInfo] = useState(null);
  const limit = 5;
  const dispatch = useDispatch();
  useEffect(()=> {
   

    fetch(`http://localhost:8000/pokemons?_page=${page}&_limit=${limit}`)
    .then((res) => {
      if(!res.ok) {
        throw new Error('Failed to fetch the data');
      }
      const totalItems = res.headers.get('X-Total-Count');
      

      if (totalItems) {
        setTotalPages(Math.ceil(totalItems / limit));
        dispatch(setTotalItems(Number(totalItems))); // <-- this line updates Redux store
      }
      setLoading(true);
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