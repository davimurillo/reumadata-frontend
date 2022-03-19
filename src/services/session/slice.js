import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    tokens:null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.tokens = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = userSlice.actions

export default userSlice.reducer