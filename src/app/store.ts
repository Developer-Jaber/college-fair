import { configureStore } from "@reduxjs/toolkit";
import reducer from "./features/admission/admissionSlice";
// import admissionReducer from './features/admission/admissionSlice'

export const store = configureStore({
    reducer: {
        admission: reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch