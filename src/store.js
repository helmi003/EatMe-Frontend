import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "./features/dishesSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    user: authReducer,
  },
});

// store.dispatch(fetchDishes());

export default store;
