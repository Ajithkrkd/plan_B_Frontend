import { configureStore } from "@reduxjs/toolkit";
import WorkLifeCycleReducer from "../../Components/work-items/slices/workLifeCycle/workLifeCycleSlice";
import isProjectAdminReducer from "./slices/isProjectAdminSlice";


const reduxStore = configureStore({
    reducer:{
        workLifeCycles:WorkLifeCycleReducer,
        isProjectAdmin:isProjectAdminReducer
    },
});

export default reduxStore;