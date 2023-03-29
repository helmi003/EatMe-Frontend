import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchDishes = createAsyncThunk("dishes/fetchDishes", async () => {
  try {
    const response = await axios.get("http://localhost:3300/api/dish");
    return response?.data;
  } catch (err) {
    return err.message;
  }
});

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDishes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export const selectAllDishes = (state) => {
  // console.log(state.dishes.items);
  return state.dishes.items["dishes"];
};
export const getDishesStatus = (state) => state.status;
export const getDishesError = (state) => state.error;

export default dishesSlice.reducer;
