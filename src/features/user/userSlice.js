import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
    watchlist: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites = [...state.favorites, action.payload];
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((id) => id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        addToWatchList: (state, action) => {
            state.watchlist = [...state.watchlist, action.payload];
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        },
        removeFromWatchList: (state, action) => {
            state.watchlist = state.watchlist.filter((id) => id !== action.payload);
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        },
        // Add other user-related reducers as needed
    },
});

export const {
    addToFavorites,
    removeFromFavorites,
    addToWatchList,
    removeFromWatchList,
} = userSlice.actions;
export default userSlice.reducer;