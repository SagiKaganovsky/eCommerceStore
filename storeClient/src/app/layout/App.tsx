import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts =   useCallback(async () => {
    const response = await fetch("http://restore.local/products");
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  },[]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
