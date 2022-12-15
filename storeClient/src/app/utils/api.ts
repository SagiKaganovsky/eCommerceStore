import axios, { AxiosError } from "axios";
// axios.defaults.baseURL = "http://restore.local";
// axios.defaults.baseURL = "https://localhost:7116";
axios.defaults.baseURL = "http://localhost:5179";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }
  }
);

const Catalog = {
  getProducts: async () => {
    const response = await axios.get("products");
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await axios.get(`products/${id}`);
    return response.data;
  },
};

const Basket = {
  get: async () => {
    const response = await axios.get("basket");
    return response.data;
  },
  addItem: async (productId: number, quantity = 1) => {
    const response = await axios.post(`basket?productId=${productId}&quantity=${quantity}`);
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
