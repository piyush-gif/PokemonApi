import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedexSlice';

const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
});

export default store;