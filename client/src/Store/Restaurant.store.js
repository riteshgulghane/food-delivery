import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CALL_STATUS } from "../constants/constant";

const initialState = {
  restaurants: [],
  status: API_CALL_STATUS.IDLE,
  error: null,
};

let GlobalRestaurants = [];

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("api/restaurant");
    return response.json();
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    updateRestaurants: (state, action) => {
      GlobalRestaurants = [...state.restaurants, action.payload];
      state.restaurants = [...state.restaurants, action.payload];
    },
    selectRestaurant: (state, action) => {
      state.restaurants.forEach((restaurant) => {
        if (restaurant.title === action.payload.title) {
          restaurant.select = !restaurant.select;
        }
      });
    },
    filterRestaurants: (state, action) => {
      state.restaurants = GlobalRestaurants.filter((restaurant) =>
        restaurant.categories.some((category) =>
          action.payload.includes(category)
        )
      ).sort((a, b) => b.isFeatured - a.isFeatured);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = API_CALL_STATUS.LOADING;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = API_CALL_STATUS.SUCCEEDED;
        GlobalRestaurants = action.payload.sort((a, b) => b.isFeatured - a.isFeatured);
        state.restaurants = GlobalRestaurants;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = API_CALL_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { updateRestaurants, selectRestaurant, filterRestaurants } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
