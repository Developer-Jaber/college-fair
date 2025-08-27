import { College } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




interface CollegesState {
    colleges: College[]
    isLoading: boolean
    error: string | null
    searchQuery: string
    sortBy: 'rating' | 'research',
    selectedCollege: College | null
}

const initialState: CollegesState = {
    colleges: [],
    searchQuery: '',
    sortBy: 'rating',
    selectedCollege: null,
    isLoading: false,     
    error: null
}


const collegesSlice = createSlice({
    name: 'colleges',
    initialState,
    reducers: {
        fetchCollegesStart(state) {
            state.isLoading = true
            state.error = null
        },
        fetchCollegesSuccess(state, action: PayloadAction<College[]>) {
            state.colleges = action.payload
            state.isLoading = false
        },
        fetchCollegesFailure(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
        },
        setSortBy(state, action: PayloadAction<'rating' | 'research'>) {
            state.sortBy = action.payload
        },
        setSelectedCollege(state, action: PayloadAction<College | null>) {
            state.selectedCollege = action.payload
        }
    }
})

export const {
    fetchCollegesStart,
    fetchCollegesSuccess,
    fetchCollegesFailure,
    setSearchQuery,
    setSortBy,
    setSelectedCollege
} = collegesSlice.actions


export default collegesSlice.reducer