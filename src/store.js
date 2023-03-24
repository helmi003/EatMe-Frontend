import { configureStore } from "@reduxjs/toolkit";
import dishesReducer, { fetchDishes } from "./features/dishesSlice";

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
  },
});

// store.dispatch(fetchDishes());

export default store;
