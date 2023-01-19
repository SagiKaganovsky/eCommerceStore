import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/api";
import { Order } from "../app/models/order";

interface OrderState {
  status: string;
  order: Order[] | null;
}

const initialState: OrderState = {
  status: "idle",
  order: null,
};

export const getOrders = createAsyncThunk<Order[]>(
  "order/getOrders",
  async (_, thunkAPI) => {
    try {
      return await api.Orders.get();
    } catch (errors: any) {
      return thunkAPI.rejectWithValue({ errors });
    }
  }
);

export const orderSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.status = "pendingGetOrders";
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.order = action.payload;
      state.status = "idle";
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
