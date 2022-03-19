import { createSlice } from '@reduxjs/toolkit'

export const coreSlice = createSlice({
  name: 'core',
  initialState: {
    ubigeos:[],
  },
  reducers: {
    setUbigeos: (state, action) => {
      state.ubigeos = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUbigeos } = coreSlice.actions

export default coreSlice.reducer