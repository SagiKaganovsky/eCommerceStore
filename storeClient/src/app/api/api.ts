import axios, { AxiosError } from "axios";
import { store } from "../../store";
import { PaginatedResponse } from "../models/pagination";
import { createFormData } from "../utils/utils";
// axios.defaults.baseURL = "http://restore.local";
// axios.defaults.baseURL = "https://localhost:7116";
// axios.defaults.baseURL = "http://localhost:5179";
axios.defaults.baseURL =
  import.meta.env.MODE !== "development"
    ? import.meta.env.BASE_URL
    : "https://localhost:7116";

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

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
  (error: any) => {
    if (error.response?.status === 400 && error.response?.data.status === 400) {
      const { errors } = error.response.data;
      return Promise.reject(Object.entries(errors));
    }
    throw new Response("Got Some Error", {
      status: error.response?.status,
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

const Account = {
  login: async (user: any) => {
    const response = await axios.post("account/login", user);
    return response.data;
  },

  register: async (user: any) => {
    const response = await axios.post("account/register", user);
    return response.data;
  },
  currentUser: async () => {
    const response = await axios.get("account/currentUser");
    return response.data;
  },
  getAddress: async () => {
    const response = await axios.get("account/savedAddress");
    return response.data;
  },
};

const Orders = {
  get: async () => {
    const response = await axios.get("orders");
    return response.data;
  },
  getOrderById: async (id: number) => {
    const response = await axios.get(`orders/${id}`);
    return response.data;
  },
  create: async (order: any) => {
    const response = await axios.post("orders", order);
    return response.data;
  },
};

const Admin = {
  createProduct: async (product: any) => {
    const response = await axios.post("products", createFormData(product), {
      headers: { "Content-type": "mulripart/form-data" },
    });
    return response.data;
  },
  updateProduct: async (product: any) => {
    const response = await axios.put("products", createFormData(product), {
      headers: { "Content-type": "mulripart/form-data" },
    });
    return response.data;
  },
  deleteProduct: async (id: number) => {
    const response = await axios.delete(`products/${id}`);
    return response.data;
  },
};

const api = {
  Catalog,
  Basket,
  Account,
  Orders,
  Admin,
};

export default api;
