import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: "",
  token: "",
  status: "idle",
  error: null,
  loading: false,
  history: "",
};

export const login = createAsyncThunk("user/authLogin", async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/api/auth/login",
      body
    );
    return response?.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const register = createAsyncThunk("user/authRegister", async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:3300/api/auth/register",
      body
    );
    return response?.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/update",
        body,
        {
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

export const userHistory = createAsyncThunk("user/userHistory", async () => {
  try {
    const response = await axios.get("http://localhost:3300/api/history", {
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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (body) => {
    try {
      const response = await axios.post(
        `http://localhost:3300/api/auth/updatePass`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              .replace(/^"|"$/g, "")}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return response?.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:3300/api/auth/profileImage",
        body,
        {
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

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.user = localStorage.getItem("user");
      state.token = localStorage.getItem("token");
    },
    logOut: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = "";
      state.token = "";
    },
    updateStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "logedIn";
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "updatedProfile";
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userHistory.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(userHistory.fulfilled, (state, action) => {
        state.status = "fetchedHistory";
        state.loading = false;
        state.history = action.payload.histories;
      })
      .addCase(userHistory.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "registred";
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "passwordChanged";
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfileImage.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = "imageUpdated";
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getUser, logOut, updateStatus } = authSlice.actions;
export const selectHistory = (state) => state.user.history;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getUserLoading = (state) => state.user.loading;
export const getUserData = (state) => state.user.user;
export default authSlice.reducer;
