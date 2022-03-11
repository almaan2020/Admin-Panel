import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resourceService from "../../services/resourceService";

const initialState = { resourceList: [], resourceInfo: {}, status: "idle", total: 0 };

export const getlist = createAsyncThunk(
    "resource/getlist",
    async (page, thunkAPI) => {
        try {
            const response = await resourceService.getResourceList(page);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    });

export const getResource = createAsyncThunk(
    "user/getResource",
    async (id, thunkAPI) => {
        try {
            const response = await resourceService.getResource(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    });

export const getTotalResource = createAsyncThunk(
    "resource/getTotalResource",
    async () => {
        const response = await resourceService.getResourceList();
        return response.data.total;
    });

const resourceSlice = createSlice({
    name: "resource",
    initialState,
    extraReducers: {
        [getlist.fulfilled]: (state, action) => {
            state.resourceList = action.payload;
            state.status = "succeeded";
        },
        [getlist.rejected]: (state) => {
            state.resourceList = [];
            state.status = "failed";
        },
        [getlist.pending]: (state) => {
            state.status = "loading";
        },
        [getTotalResource.fulfilled]: (state, action) => {
            state.total = action.payload;
        },
        [getResource.fulfilled]: (state, action) => {
            state.resourceInfo = { ...action.payload };
        },
    },
});

export default resourceSlice.reducer;
