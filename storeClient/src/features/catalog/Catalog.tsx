import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { Product } from "../../app/models/product";
import api from "../../app/utils/api";
import Loader from "../loader/Loader";
import ProductList from "./ProductList";

const Catalog: React.FC = () => {
  const products = useLoaderData() as Product[];
  return (
    <Suspense fallback={<Loader />}>
      <ProductList products={products} />
    </Suspense>
  );
};

export default Catalog;

export const loader = () => api.Catalog.getProducts();
