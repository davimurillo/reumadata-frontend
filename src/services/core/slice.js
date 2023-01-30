import { createSlice } from '@reduxjs/toolkit'

export const coreSlice = createSlice({
  name: 'core',
  initialState: {
    ubigeos:[],
    patients: []
  },
  reducers: {
    setUbigeos: (state, action) => {
      state.ubigeos = action.payload;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUbigeos, setPatients } = coreSlice.actions

export default coreSlice.reducer