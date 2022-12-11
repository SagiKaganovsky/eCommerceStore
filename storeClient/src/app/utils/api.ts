import axios from "axios";

export const getCategory = async () => {
  const response = await axios.get("http://restore.local/products");
  return response.data;
};
export const getProductById = async (id: string) => {
  const response = await axios.get(`http://restore.local/products/${id}`);
  return response.data;
};
