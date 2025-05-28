import {createSlice} from '@reduxjs/toolkit';


const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: [],
    reducers:{
      addFavorite:(state, action) => {
          state.addFav =action.payload;
      },
      removeFavorite:(state, action) => {
        state.removeFav = action.payload;
      }
    }
  },
)
export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;