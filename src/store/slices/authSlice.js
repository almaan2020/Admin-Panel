import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, clearMessage } from "./messageSlice";
import authService from "../../services/authService";

const user = localStorage.getItem(authService.tokenKey);
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export const register = createAsyncThunk(
    "auth/register",
    async ({ username, password }, thunkAPI) => {
        try {
            await authService.register(username, password);
        } catch (error) {
            thunkAPI.dispatch(setMessage(error.response.data.error));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await authService.login(username, password);
            thunkAPI.dispatch(clearMessage());
            // The value we return becomes the `fulfilled` action payload
            return response.data.token;
        } catch (error) {
            thunkAPI.dispatch(setMessage(error.response.data.error));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        [login.rejected]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export default authSlice.reducer;