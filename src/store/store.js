import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer,
        // Add other reducers if you have more slices
    },
});

export default store;