import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_CALL_STATUS } from '../constants/constant';

const initialState = {
  category: [],
  status: API_CALL_STATUS.IDLE,
  error: null,
};
let categoryImages = null;

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await fetch('api/category');
  return response.json();
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.category = [...state.category, action.payload];
    },
    selectCategory: (state, action) => {
      state.category.forEach(category => {
        if (category.title === action.payload.title) {
          category.select = !category.select;
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = API_CALL_STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = API_CALL_STATUS.SUCCEEDED;
        state.category = action.payload;
        getCategoryImagesMap(state);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = API_CALL_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const getCategoryImagesMap = state => {
  if (!categoryImages && state && state.category && state.category.length > 0) {
    categoryImages = state.category.reduce((acc, curr) => {
      acc[curr.title] = {
        title: curr.title,
        image: curr.image,
      };
      return acc;
    }, {});
  }
  return categoryImages;
};

export const { updateCategories, selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
