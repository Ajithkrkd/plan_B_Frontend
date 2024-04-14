import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./slices/userDetailsSlice";
import workItemSlice from "../../Components/work-items/slices/workItemSlice";


const reduxStore = configureStore({
    reducer:{
        userDetails: userDetailsSlice,
        workItems:workItemSlice,
    },
});

export default reduxStore;