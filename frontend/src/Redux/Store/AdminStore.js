import { configureStore } from "@reduxjs/toolkit";

import adminReducer from '../Slices/AdminSlice'

export const store =configureStore({
    reducer:{
        admin:adminReducer
    }
})