import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTotalItems } from './pokedexSlice';
import { openPopup, fetchPokemonDetails } from './popupSlice';

const PokeDex = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : {};
  });

  const dispatch = useDispatch();
  const limit = 8;

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch cards (paginated or all favorites)
  useEffect(() => {
    setLoading(true);
    const url = showFavorites
      ? `http://localhost:5000/get-data`
      : `http://localhost:5000/get-data?_page=${page}&_limit=${limit}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Pokémon');
        const total = res.headers.get('X-Total-Count');
        if (total && !showFavorites) {
          const count = Number(total);
          setTotalPages(Math.ceil(count / limit));
          dispatch(setTotalItems(count));
        }
        return res.json();
      })
      .then((data) => {
        const filtered = showFavorites
          ? data.filter((card) => favorites[card._id])
          : data;
        setCards(filtered);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [page, showFavorites, favorites, dispatch]);

  // Delete a card
  const handleDelete = (id) => {
    if (!window.confirm("Delete this Pokémon?")) return;
    setLoading(true);
    fetch(`http://localhost:5000/delete-data/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Delete Failed');
        return res.json();
      })
      .then(() => {
        setCards((prev) => prev.filter((card) => card._id !== id));
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to delete Pokémon');
      })
      .finally(() => setLoading(false));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="pokedex-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <button onClick={() => setShowFavorites((prev) => !prev)}>
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="pokedex-container">
        {filteredCards.map((card) => (
          <div
            key={card._id}
            className="pokemon-card"
            onClick={() => {
              dispatch(fetchPokemonDetails(card._id));
              dispatch(openPopup());
            }}
          >
            <h3>{card.name}</h3>
            <img src={card.img} alt={card.name} />
            <p>
              Type:{' '}
              {card.type?.map((t) => (
                <span key={t} className={`type-${t}`}>
                  {t}{' '}
                </span>
              ))}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(card._id);
              }}
            >
              {favorites[card._id] ? '❤️' : '🩶'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {!showFavorites && (
        <div className="pagination-controls">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ⬅
          </button>
          <span>
            Page {page} {totalPages && `of ${totalPages}`}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={totalPages !== null && page >= totalPages}
          >
            ➡
          </button>
        </div>
      )}

      <div className="footer">
        <p>© 2025 Piyush Khadka</p>
      </div>
    </div>
  );
};

export default PokeDex;
