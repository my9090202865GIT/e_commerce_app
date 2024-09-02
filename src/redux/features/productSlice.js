import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  categories: [],
  currentCategory: "all",
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addcurrentCategory: (state, action) => {
      return { ...state, currentCategory: action.payload };
    },
    
    addCategories: (state, action) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action) => {
      return { ...state, allProducts: action.payload };
    },
  },
});

export const {
  addcurrentCategory,
  addCategories,
  addProducts,
} = productSlice.actions;
export default productSlice.reducer;
