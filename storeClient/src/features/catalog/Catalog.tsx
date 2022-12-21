import { Grid, Paper, TextField } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchProductsAsync,
  fetchProductsFiltersAsync,
  productSelectors,
} from "../../store/catalogSlice";
import FiltersList from "../filters/FiltersList";
import ProductList from "./ProductList";

const Catalog: React.FC = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types } = useAppSelector(
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

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField label="Search products" variant="outlined" fullWidth />
        </Paper>
        <Paper sx={{ mb: 2 }}>
          <FiltersList
            label="Brands"
            list={brands}
            handleChange={(item) => console.log(item)}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
};

export default Catalog;
