import { useLoaderData } from "react-router-dom";
import { Product } from "../../app/models/product";
import { getCategory } from "../../app/utils/api";
import ProductList from "./ProductList";

const Catalog: React.FC = () => {
  const products = useLoaderData() as Product[];
  return <ProductList products={products} />;
};

export default Catalog;

export const loader = () => getCategory();
