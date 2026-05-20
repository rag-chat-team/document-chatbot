import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        logout: (state) => {
            state.user = null;
            state.error = null;
        }
    }
});

export const {
    setLoading,
    setUser,
    setError,
    clearError,
    logout
} = authSlice.actions;

export default authSlice.reducer;