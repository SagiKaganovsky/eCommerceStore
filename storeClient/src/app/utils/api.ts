import axios, { AxiosError } from "axios";
axios.defaults.baseURL = "http://restore.local";

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

export const getCategory = async () => {
  const response = await axios.get("products");
  return response.data;
};
export const getProductById = async (id: string) => {
  const response = await axios.get(`products/${id}`);
  return response.data;
};
