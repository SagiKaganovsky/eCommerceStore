import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../app/api/api";
import { User } from "../app/models/user";

interface AccountState {
  user: User | null;
  status: string;
  errors: any;
}

const initialState: AccountState = {
  user: null,
  status: "idle",
  errors: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await api.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const signUpUser = createAsyncThunk<void, FieldValues>(
  "account/signUpUser",
  async (data, thunkAPI) => {
    try {
      await api.Account.register(data);
    } catch (errors: any) {
      return thunkAPI.rejectWithValue({ errors });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(
      accountActions.setUser(JSON.parse(localStorage.getItem("user")!))
    );
    try {
      const user = await api.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.statusText });
    }
  },
  {
    condition: (state) => {
      if (!localStorage.getItem("user")) {
        return false;
      }
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired - please login again");
      state.status = "idle";
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.status = "fulfilled";
      state.errors = null;
    });
    builder.addMatcher(
      isAnyOf(signInUser.pending, fetchCurrentUser.pending, signUpUser.pending),
      (state) => {
        state.status = "pending";
        state.errors = null;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, signUpUser.rejected),
      (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.errors = action.payload;
      }
    );
  },
});

export const accountReducer = accountSlice.reducer;
export const accountActions = accountSlice.actions;
