import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Product } from "../app/models/product";
import api from "../app/api/api";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await api.Catalog.getProducts();
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);
export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await api.Catalog.getProductById(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const fetchProductsFiltersAsync = createAsyncThunk(
  "catalog/fetchProductsFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await api.Catalog.getProductsFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.statusText });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
    filtersLoaded: false,
    brands: [],
    types: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addCase(fetchProductsFiltersAsync.pending, (state) => {
      state.status = "pendingFetchProductsFilters";
    });
    builder.addCase(fetchProductsFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchProductsFiltersAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const catalogReducer = catalogSlice.reducer;
export const catalogActions = catalogSlice.actions;
