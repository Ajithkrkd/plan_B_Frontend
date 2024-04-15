import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./slices/userDetailsSlice";
import WorkLifeCycleReducer from "../../Components/work-items/slices/workLifeCycle/workLifeCycleSlice";
import workItemSlice from "../../Components/work-items/slices/workitem/workItemSlice";


const reduxStore = configureStore({
    reducer:{
        userDetails: userDetailsSlice,
        workItems: workItemSlice,
        workLifeCycles:WorkLifeCycleReducer,
    },
});

export default reduxStore;