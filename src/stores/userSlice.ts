import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = {};
    },
  },
});
export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
