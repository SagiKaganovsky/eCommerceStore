import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchProductsAsync,
  fetchProductsFiltersAsync,
  productSelectors,
} from "../../store/catalogSlice";
import FiltersList from "../../app/components/filters/FiltersList";
import Sort from "../../app/components/sort/Sort";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  {
    value: "name",
    label: "Alphabetical",
  },
  {
    value: "priceDesc",
    label: "Price - High to low",
  },
  {
    value: "price",
    label: "Price - Low to high",
  },
];

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
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <Sort
            sortOptions={sortOptions}
            handleChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Paper>
        <Paper sx={{ mb: 2 }}>
          <FiltersList
            label="Brands"
            list={brands}
            handleChange={(item) => console.log(item)}
          />
        </Paper>
        <Paper sx={{ mb: 2 }}>
          <FiltersList
            label="Type"
            list={types}
            handleChange={(item) => console.log(item)}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        {productsLoaded ? (
          <ProductList products={products} />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <FidgetSpinner />
          </Box>
        )}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination
            color="secondary"
            size="large"
            count={10}
            page={2}
            onChange={(e, value) => console.log(value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
