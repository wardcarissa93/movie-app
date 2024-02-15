import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
    selectedCategory: 'popular', // Default category is popular
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
});

export const { setSelectedCategory } = moviesSlice.actions;
export default moviesSlice.reducer;