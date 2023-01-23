import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  productSelectors,
  fetchProductsAsync,
  fetchProductsFiltersAsync,
} from "../../store/catalogSlice";

const useProducts = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.catalog);
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

  return { products, productsLoaded, filtersLoaded, brands, types, metaData };
};

export default useProducts;
