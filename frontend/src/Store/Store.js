import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserStore";

const Store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default Store;
