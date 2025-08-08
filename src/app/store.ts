import { configureStore } from "@reduxjs/toolkit";
import admissionReducer from "./features/admission/admissionSlice"
import collegesReducer from "./features/colleges/collegesSlice"


export const store = configureStore({
    reducer: {
        admission: admissionReducer,
        colleges: collegesReducer

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch