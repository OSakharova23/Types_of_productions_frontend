import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: 0 // 0 - гость, 1 - вошел
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    }
  }
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;