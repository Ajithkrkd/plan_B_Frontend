import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { creatWorkLifeCycle, getAllWorkLifeCycle } from "../../../../Api/workLifeCycle";

const initialState = {
    workLifeCycles:[],
    status:"idle" , //pending succeeded loading failed
    error:null,
}
export const fetchWorkLifeCycle = createAsyncThunk(
    "workLifeCycle/fetchWorkLifeCycle",async () =>{
        try {
            const response = await getAllWorkLifeCycle();
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
)

export const addWorkLifeCycle = createAsyncThunk(
    "workLifeCycle/addWorkLifeCycle",
    async (workLifeCycleDto) =>{
        try {
            const response = await creatWorkLifeCycle(workLifeCycleDto);
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }
    }
)

export const workLifeCycleSlice = createSlice({
    name:'workLifeCycle',
    initialState:initialState,
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(fetchWorkLifeCycle.pending,(state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchWorkLifeCycle.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.workLifeCycles = action.payload;
        })
        .addCase(fetchWorkLifeCycle.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch work life cycle data'; 
          });
          //adding worklife cyle 
        addCase(addWorkLifeCycle.fulfilled,(state,action)=>{
            state.status = "Succeeded";
            state.workLifeCycles.push(action.payload);
        })
        .addCase(addWorkLifeCycle.pending , (state)=>{
            state.status="loading";
            state.error=null;
        })
        .addCase(addWorkLifeCycle.rejected , (state,action)=>{
            state.status = "failed"
            state.error = action.error.message || "Error while adding message";
        })
    }
})

export default workLifeCycleSlice.reducer;
export const getAllWorkLifeCycleList = (state) => state.workLifeCycles.workLifeCycles;
export const getWorkLifeCycleStatus = (state) => state.workLifeCycles.status;
export const getWorkLifeCycleErrors = (state) => state.workLifeCycles.error; 