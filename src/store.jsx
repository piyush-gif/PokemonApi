import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice.js';
import themeReducer from './themeSlice.js'
import popupReducer from './popupSlice';
const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    theme: themeReducer,
    popup: popupReducer,
  },
});

export default store;