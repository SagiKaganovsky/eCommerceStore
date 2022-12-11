import axios from "axios";
const baseUrl = "http://restore.local"
export const getCategory = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};
export const getProductById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
};
