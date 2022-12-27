import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";
import { accountReducer } from "./accountSlice";
import { basketReducer } from "./basketSlice";
import { catalogReducer } from "./catalogSlice";

const rootReducer = combineReducers({
  basket: basketReducer,
  catalog: catalogReducer,
  account: accountReducer
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
