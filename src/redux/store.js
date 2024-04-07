import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
    reducer: {
        cartReducer,
        productReducer,
        authReducer,
    },
});

