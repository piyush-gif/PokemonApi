// popupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemonDetails = createAsyncThunk(
  'popup/fetchPokemonDetails',
  async (id) => {
    const res = await fetch(`http://localhost:8000/pokemons/${id}`);
    if (!res.ok) throw new Error('Failed to fetch details');
    const data = await res.json();
    return data;
  }
);

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isOpen: false,
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
