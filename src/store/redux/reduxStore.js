import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./slices/userDetailsSlice";


const reduxStore = configureStore({
    reducer:{
        userDetails: userDetailsSlice,
    },
});

export default reduxStore;