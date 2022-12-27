import { createAsyncThunk, createSlice, isAllOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import api from "../app/api/api";
import { User } from "../app/models/user";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await api.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await api.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAllOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAllOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});

export const accountReducer = accountSlice.reducer;
export const accountActions = accountSlice.actions;
