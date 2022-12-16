import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current: 'bun'
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.current = action.payload
    }
  }
})

export const {setCurrentTab} = tabSlice.actions
export default tabSlice.reducer;
