export const getCategory = async () => {
  const response = await fetch("http://restore.local/products");
  if (response.ok) {
    return await response.json();
  }
};
export const getProductById = async (id: string) => {
  const response = await fetch(`http://restore.local/products/${id}`);
  if (response.ok) {
    return await response.json();
  }
};
