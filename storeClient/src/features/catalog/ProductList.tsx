import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => (
        <Grid key={product.id} item xs={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
