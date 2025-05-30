
import { createSlice } from '@reduxjs/toolkit';

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    totalItems: '',
  },
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setTotalItems } = pokedexSlice.actions;
export default pokedexSlice.reducer;
