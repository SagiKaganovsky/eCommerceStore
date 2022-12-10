import { useCallback, useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = useCallback(async () => {
    const response = await fetch("http://restore.local/products");
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} />
    </>
  );
}

export default App;
