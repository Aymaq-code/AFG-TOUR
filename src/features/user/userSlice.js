import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },

    clearName(state) {
      state.username = "";
      localStorage.removeItem("username");
    },
  },
});

export const { updateName, clearName } = userSlice.actions;
export default userSlice.reducer;
