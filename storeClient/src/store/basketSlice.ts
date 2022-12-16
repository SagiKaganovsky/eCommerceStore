import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../app/models/basket";
import { Status } from "../app/models/status";

interface BasketState {
  basket: Basket | null;
  status: Status;
}

export const initialStatusState = {
  loading: false,
  productId: -1,
  action: "",
};

const initialBasketState: BasketState = {
  basket: null,
  status: initialStatusState,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState: initialBasketState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload as {
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
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const basketReducer = basketSlice.reducer;

export const basketActions = basketSlice.actions;
