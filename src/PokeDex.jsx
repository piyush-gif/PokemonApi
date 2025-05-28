import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalItems } from './pokedexSlice.js';
import { openPopup, fetchPokemonDetails } from './popupSlice.js';
import { addFavorite, removeFavorite } from './favoriteSlice.js';

const PokeDex = () => {
  const [error, setError] = useState(null);
  const [cards, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 10;
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorite); // 👈 Get favorite Pokémon IDs

  useEffect(() => {
    fetch(`http://localhost:8000/pokemons?_page=${page}&_limit=${limit}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch the data');
        }
        const totalItems = res.headers.get('X-Total-Count');
        if (totalItems) {
          setTotalPages(Math.ceil(totalItems / limit));
          dispatch(setTotalItems(Number(totalItems)));
        }
        setLoading(true);
        return res.json();
      })
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/pokemons/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Delete Failed');
        }
        setCard(cards.filter((card) => card.id !== id));
      })
      .catch((err) => {
        console.error('Delete error:', err);
        setError('Failed to delete Pokémon');
      });
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent card click
    if (favoriteIds.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="pokedex-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <div className="pokedex-container">
        {filteredCards.map((card) => (
          <div
            className="pokemon-card"
            key={card.id || card.name}
            onClick={() => {
              dispatch(fetchPokemonDetails(card.id));
              dispatch(openPopup());
            }}
          >
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
            <button
              onClick={(e) => toggleFavorite(e, card.id)}
              className="favorite-btn"
            >
              {favoriteIds.includes(card.id) ? '🩶' : '❤️'}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
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
      <div className="footer">
      <p>© 2025 Piyush Khadka.</p>
    </div>
    </div>
  );
};

export default PokeDex;
