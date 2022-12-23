import axios, { AxiosError } from "axios";
import { PaginatedResponse } from "../models/pagination";
// axios.defaults.baseURL = "http://restore.local";
// axios.defaults.baseURL = "https://localhost:7116";
axios.defaults.baseURL = "http://localhost:5179";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  (error: AxiosError) => {
    throw new Response("Got Some Error", {
      status: error.status,
      statusText: error.message,
    });
  }
);

const Catalog = {
  getProducts: async (params?: URLSearchParams) => {
    const response = await axios.get("products", { params });
    return response.data;
  },
  getProductById: async (id: number) => {
    const response = await axios.get(`products/${id}`);
    return response.data;
  },
  getProductsFilters: async () => {
    const response = await axios.get("products/filters");
    return response.data;
  },
};

const Basket = {
  get: async () => {
    const response = await axios.get("basket");
    return response.data;
  },
  addItem: async (productId: number, quantity = 1) => {
    const response = await axios.post(
      `basket?productId=${productId}&quantity=${quantity}`
    );
    return response.data;
  },
  removeItem: async (productId: number, quantity = 1) => {
    const response = await axios.delete(
      `basket?productId=${productId}&quantity=${quantity}`
    );
    return response.data;
  },
};

const api = {
  Catalog,
  Basket,
};

export default api;
