import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../app/models/basket";
import api from "../app/utils/api";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialBasketState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>("basket/addBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await api.Basket.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number; action: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    await api.Basket.removeItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
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
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const basketReducer = basketSlice.reducer;

export const basketActions = basketSlice.actions;
