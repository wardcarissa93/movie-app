import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    // Add other movie-related state properties as needed
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        setUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        // Add other movie-related reducers as needed
    },
});

export const { setPopularMovies, setTopRatedMovies, setUpcomingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;