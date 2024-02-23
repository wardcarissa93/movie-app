import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '', // Initial message state
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload; // Set message to the provided payload
        },
        clearMessage: (state) => {
            state.message = ''; // Clear the message
        },
    },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;