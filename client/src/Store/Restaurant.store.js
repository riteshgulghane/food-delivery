import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_CALL_STATUS } from '../constants/constant';

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  status: API_CALL_STATUS.IDLE,
  error: null,
};

export const fetchRestaurants = createAsyncThunk('restaurant/fetchRestaurants', async () => {
  const response = await fetch('api/restaurant');
  return response.json();
});

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    updateRestaurants: (state, action) => {
      // Add new restaurant without creating new arrays
      state.restaurants.push(action.payload);
      state.filteredRestaurants.push(action.payload);
    },
    selectRestaurant: (state, action) => {
      // Direct mutation is fine with Redux Toolkit's Immer
      const restaurant = state.restaurants.find(r => r.title === action.payload.title);
      if (restaurant) {
        restaurant.select = !restaurant.select;
      }
    },
    filterRestaurants: (state, action) => {
      // Only filter if there are categories selected
      if (action.payload.length === 0) {
        state.filteredRestaurants = state.restaurants;
        return;
      }

      // Filter from original restaurants, not global variable
      state.filteredRestaurants = state.restaurants.filter(restaurant =>
        restaurant.categories.some(category => action.payload.includes(category))
      );

      // Sort only once after filtering
      if (state.filteredRestaurants.length > 0) {
        state.filteredRestaurants.sort((a, b) => b.isFeatured - a.isFeatured);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurants.pending, state => {
        state.status = API_CALL_STATUS.LOADING;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = API_CALL_STATUS.SUCCEEDED;
        // Sort once and store both original and filtered
        const sortedData = action.payload.sort((a, b) => b.isFeatured - a.isFeatured);
        state.restaurants = sortedData;
        state.filteredRestaurants = sortedData;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = API_CALL_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { updateRestaurants, selectRestaurant, filterRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;
