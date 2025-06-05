import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    signUp: (state, action) => {
      return [...state, action.payload];
    },
    signIn: (state, action) => {
      console.log("actions - ", action);
      return [...state, action.payload];
    },
  },
});

export const { signUp, signIn } = userSlice.actions;

export default userSlice.reducer;
