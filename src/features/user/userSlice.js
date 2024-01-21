import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    watchlist: [],
    // Add other user-related state properties as needed
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites = [...state.favorites, action.payload];
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((id) => id !== action.payload);
        },
        addToWatchlist: (state, action) => {
            state.watchlist = [...state.watchlist, action.payload];
        },
        removeFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter((id) => id !== action.payload);
        },
        // Add other user-related reducers as needed
    },
});

export const {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
} = userSlice.actions;
export default userSlice.reducer;