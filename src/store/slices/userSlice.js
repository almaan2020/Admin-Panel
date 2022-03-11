import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import userService from "../../services/userService";

const initialState = { userList: [], userInfo: {}, status: "idle", total: 0 };

export const getlist = createAsyncThunk(
    "user/getlist",
    async (page, thunkAPI) => {
        try {
            const response = await userService.getUserList(page);
            return response.data.data;
        } catch (error) {
            thunkAPI.dispatch(setMessage(error.response.data.error));
            return thunkAPI.rejectWithValue();
        }
    });

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id, thunkAPI) => {
        try {
            const response = await userService.getUser(id);
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setMessage(error.response.data.error));
            return thunkAPI.rejectWithValue();
        }
    });

export const create = createAsyncThunk(
    "user/create",
    async ({ first_name, last_name, email }, thunkAPI) => {
        const response = await userService.createUser(first_name, last_name, email);
        thunkAPI.dispatch(setMessage("User Created."));
        return response.data;
    });

export const editUser = createAsyncThunk(
    "user/editUser",
    async ({ id, first_name, last_name, email }, thunkAPI) => {
        const response = await userService.editUser(id, first_name, last_name, email);
        thunkAPI.dispatch(setMessage("User Edited."));
        return { id, ...response.data };
    });

export const getTotalUser = createAsyncThunk(
    "user/getTotalUser",
    async () => {
        const response = await userService.getUserList();
        return response.data.total;
    });

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, thunkAPI) => {
        await userService.deleteUser(id);
        thunkAPI.dispatch(setMessage("User Deleted."));
        return id;
    });

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [getlist.fulfilled]: (state, action) => {
            state.userList = [...action.payload];
            state.status = "succeeded";
        },
        [getlist.rejected]: (state) => {
            state.userList = [];
            state.status = "failed";
        },
        [getlist.pending]: (state) => {
            state.status = "loading";
        },
        [create.fulfilled]: (state, action) => {
            state.userList = [...state.userList, action.payload];
            state.total++;
        },
        [editUser.fulfilled]: (state, action) => {
            const editId = action.payload.id;
            const index = state.userList.findIndex(user => user.id === Number(editId));
            if (index !== -1) {
                state.userList[index].first_name = action.payload.first_name;
                state.userList[index].last_name = action.payload.last_name;
                state.userList[index].email = action.payload.email;
            }
        },
        [getTotalUser.fulfilled]: (state, action) => {
            state.total = action.payload;
        },
        [deleteUser.fulfilled]: (state, action) => {
            const deleteId = action.payload;
            const index = state.userList.findIndex(user => user.id === deleteId);
            if (index !== -1) {
                state.userList.splice(index, 1);
                state.total--;
            }
        },
        [getUser.fulfilled]: (state, action) => {
            state.userInfo = { ...action.payload };
        },
    },
});

export default userSlice.reducer;
