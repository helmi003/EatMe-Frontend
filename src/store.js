import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "./features/dishesSlice";
import authReducer from "./features/authSlice";
import favoriteReducer from "./features/favoriteSlice";

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    user: authReducer,
    favorite: favoriteReducer,
  },
});

export default store;
