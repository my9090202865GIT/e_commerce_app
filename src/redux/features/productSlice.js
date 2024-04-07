import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    updateFeaturedList: (state, action) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action) => {
      const { wishlist } = state;
      if (wishlist.findIndex((item) => item.id === action.payload.id) === -1) {
        const updatedList = [...state.wishlist, action.payload];
        return { ...state, wishlist: updatedList };
      }
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
  updateFeaturedList,
  addToWishlist,
  addCategories,
  addProducts,
} = productSlice.actions;
export default productSlice.reducer;
