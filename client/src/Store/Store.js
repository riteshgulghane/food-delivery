import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserStore";
import CategoryReducer from "./Category.store";
import RestaurantReducer from "./Restaurant.store";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    category: CategoryReducer,
    restaurant: RestaurantReducer,
  },
});

export default Store;
