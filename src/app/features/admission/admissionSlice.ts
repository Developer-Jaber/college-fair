import { AdmissionData, AdmissionState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: AdmissionState = {
  userAdmissions: [],
  loading: false,
  error: null
}

const admissionSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {
    submitAdmissionStart(state) {
      state.loading = true
      state.error = null
    },
    submitAdmissionSuccess(state, action: PayloadAction<AdmissionData>) {
      state.userAdmissions.push(action.payload)
      state.loading = false
    },
    submitAdmissionFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    fetchUserAdmissionsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchUserAdmissionsSuccess(state, action: PayloadAction<AdmissionData[]>) {
      state.userAdmissions = action.payload
      state.loading = false
    },
    fetchUserAdmissionsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})


export const {
  submitAdmissionStart,
  submitAdmissionSuccess,
  submitAdmissionFailure,
  fetchUserAdmissionsStart,
  fetchUserAdmissionsSuccess,
  fetchUserAdmissionsFailure
} = admissionSlice.actions

export default admissionSlice.reducer