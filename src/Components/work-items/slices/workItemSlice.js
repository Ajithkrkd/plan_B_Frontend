import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../../../services/customAxios";
import { workItemRoutes } from "../../../services/endpoints/workItemEndpoints";
import errorHandler from "../../../Api/error";
import { getAllWorkItems } from "../../../Api/workItem";


const initialState = {
    workItems: [],
    status: "idle",
    error: null,
};

export const fetchWorkItems = createAsyncThunk(
    "workItems/fetchWorkItems",
    async (_projectId) => {
        try {
            const response = await getAllWorkItems(2);
            return response.data;
        } catch (error) {
            return rejectWithValue(errorHandler(error));
        }
    }
);

const workItemsSlice = createSlice({
    name: "workItems",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkItems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.workItems = action.payload;
            })
            .addCase(fetchWorkItems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
        
    },
});

export const allWorkItems = (state) => state.workItems.workItems;
export const getWorkItemStatus = (state) => state.workItems.status;
export const getWorkItemErrors = (state) => state.workItems.error;
export default workItemsSlice.reducer;
