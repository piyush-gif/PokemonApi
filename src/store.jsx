import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice.js';
import themeReducer from './themeSlice.js'
import popupReducer from './popupSlice.js';
import favoriteReducer from './favoriteSlice.js'
const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    theme: themeReducer,
    popup: popupReducer,
    favorite: favoriteReducer,
  },
});

export default store;