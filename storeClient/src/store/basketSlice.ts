import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../app/models/basket";
import api from "../app/api/api";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialBasketState: BasketState = {
  basket: null,
  status: "idle",
};

export const getBasketAsync = createAsyncThunk<Basket>(
  "basket/getBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await api.Basket.get();
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await api.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number; action: string }
>(
  "basket/removeBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      await api.Basket.removeItem(productId, quantity);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "rejected";
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" +
        action.meta.arg.action +
        action.meta.arg.productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg as {
        productId: number;
        quantity: number;
      };
      const existingItemIndex = state.basket?.items.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex !== undefined && existingItemIndex >= 0) {
        if (state.basket?.items !== undefined) {
          const { items } = state.basket;
          items[existingItemIndex].quantity -= quantity;
          if (items[existingItemIndex].quantity === 0) {
            items.splice(existingItemIndex, 1);
          }
        }
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "rejected";
    });
    builder.addCase(getBasketAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getBasketAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.basket = action.payload;
      } else {
        state.basket = {
          id: -1,
          buyerId: "",
          items: [],
        };
      }
      state.status = "idle";
    });
    builder.addCase(getBasketAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "rejected";
    });
  },
});

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;
