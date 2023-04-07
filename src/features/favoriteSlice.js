import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};
export const favorite = createAsyncThunk("favorite/fetchFavorite", async () => {
  try {
    const response = await axios.get("http://localhost:3300/api/favorite", {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          .replace(/^"|"$/g, "")}`,
      },
    });
    return response?.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (body) => {
    try {
      const response = await axios.post("http://localhost:3300/api/favorite", {
        body,
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            .replace(/^"|"$/g, "")}`,
        },
      });
      return response?.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorite/removeFavorite",
  async ({ id, body }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3300/api/favorite/${id}`,
        {
          body,
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              .replace(/^"|"$/g, "")}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    // deleteFavorite: (state) => {
    //   state.items = ;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(favorite.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(favorite.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(favorite.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addFavorite.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = "successAdding";
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "errorAdding";
        state.error = action.error.message;
      })
      .addCase(removeFavorite.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = "successRemoving";
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = "errorRemoving";
        state.error = action.error.message;
      });
  },
});

export const selectAllFavorites = (state) => state.favorite.items;
export const getFavoritesStatus = (state) => state.favorite.status;
export const getFavoritesError = (state) => state.favorite.error;

export default favoriteSlice.reducer;
