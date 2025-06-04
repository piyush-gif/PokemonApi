import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice.js';
import popupReducer from './popupSlice.js';
const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    popup: popupReducer,
  },
});

export default store;