import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchProductsAsync,
  fetchProductsFiltersAsync,
  productSelectors,
} from "../../store/catalogSlice";
import ProductList from "./ProductList";

const Catalog: React.FC = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchProductsFiltersAsync());
    }
  }, [filtersLoaded, dispatch]);
  
  return <ProductList products={products} />;
};

export default Catalog;
