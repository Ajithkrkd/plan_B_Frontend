import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isProjectAdmin } from "../../../Api/admin/adminApis";

const initialState = {
  isProjectAdmin: false,
  status: "idle",
  error: null
};

export const checkAdminOrNot = createAsyncThunk(
  "project/isProjectAdministrator",
  async (projectId) => {
    console.log(projectId);
    try {
      const response = await isProjectAdmin(projectId);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const isAdminSlice = createSlice({
  name: "isProjectAdmin",
  initialState: initialState,
  reducers: {
    // You can add reducers here if needed
  },
  extraReducers(builder) {
    builder
      .addCase(checkAdminOrNot.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAdminOrNot.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.isProjectAdmin = action.payload; 
      })
      .addCase(checkAdminOrNot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch work life cycle data";
      });
  }
});

export default isAdminSlice.reducer;
export const getIsProjectAdminOrNot = (state) => state.isProjectAdmin.isProjectAdmin;
export const getProjectAdminStatusStatus = (state) => state.isProjectAdmin.status;
export const getProjectAdminErrors = (state) => state.isProjectAdmin.error; 