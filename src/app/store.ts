import { configureStore } from "@reduxjs/toolkit";
import admissionReducer from './features/admission/admissionSlice'

export const store = configureStore({
    reducer: admissionReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch