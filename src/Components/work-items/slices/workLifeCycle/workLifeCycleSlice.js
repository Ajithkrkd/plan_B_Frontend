import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { creatWorkLifeCycle, editWorkLifeCycle, getAllWorkLifeCycle } from "../../../../Api/workLifeCycle";
import errorHandler from "../../../../Api/error";

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

export const updateWorkLifeCycle = createAsyncThunk(
    "workLifeCycle/updateWorkLifeCycle",
    async ({workLifeCycleDto,workingLifeCycleId}) =>{
        console.log(workingLifeCycleId)
        try {
            const response = await editWorkLifeCycle(workLifeCycleDto,workingLifeCycleId);
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
        builder.addCase(addWorkLifeCycle.fulfilled,(state,action)=>{
            state.status = "Succeeded";
            console.log(action.payload)
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


        builder.addCase(updateWorkLifeCycle.fulfilled, (state, action) => {
            state.status = "succeeded";
          
            const updatedIndex = state.workLifeCycles.findIndex(
                cycle => cycle.workingLifeCycleId === action.payload.workingLifeCycleId
            );
            if (updatedIndex !== -1) {
                state.workLifeCycles[updatedIndex] = action.payload;
            }
        })
        .addCase(updateWorkLifeCycle.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(updateWorkLifeCycle.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Error while updating work life cycle";
        });
        
    }
})

export default workLifeCycleSlice.reducer;
export const getAllWorkLifeCycleList = (state) => state.workLifeCycles.workLifeCycles;
export const getWorkLifeCycleStatus = (state) => state.workLifeCycles.status;
export const getWorkLifeCycleErrors = (state) => state.workLifeCycles.error; 