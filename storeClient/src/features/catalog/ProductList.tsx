import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <List>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </List>
  );
};

export default ProductList;
