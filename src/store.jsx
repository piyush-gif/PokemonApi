import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';
import themeReducer from './themeSlice'
const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    theme: themeReducer,
  },
});

export default store;