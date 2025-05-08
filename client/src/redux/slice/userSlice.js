import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile
export const fetchUser = createAsyncThunk('fetchUser', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userprofile`,{withCredentials: true});
        return response.data;
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

// Logout user
export const logout = createAsyncThunk('logout', async () => {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`); // Send a POST request to your logout endpoint
        return {}; // Return an empty object or any relevant data if needed
    } catch (error) {
        throw Error(error.response ? error.response.data.message : error.message);
    }
});

const userSlice = createSlice({
    name: 'userData',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: '',
    },
    extraReducers: (builder) => {
        // Handle fetchUser actions
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
            console.log('Error:', action.error.message);
        });
        // Handle logout actions
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.data = []; // Clear user data on logout
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
            console.log('Error:', action.error.message);
        });
    }
});

export default userSlice.reducer;
