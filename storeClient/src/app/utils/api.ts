export const getCategory = async () => {
  const response = await fetch("http://restore.local/products");
  if (response.ok) {
    return await response.json();
  }
};
