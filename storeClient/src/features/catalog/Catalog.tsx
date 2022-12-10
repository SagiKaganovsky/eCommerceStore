import { useCallback, useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog: React.FC = () => {
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
  return <ProductList products={products} />;
};

export default Catalog;
