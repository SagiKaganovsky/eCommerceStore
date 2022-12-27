import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  catalogActions,
  fetchProductsAsync,
  fetchProductsFiltersAsync,
  productSelectors,
} from "../../store/catalogSlice";
import FiltersList from "../../app/components/filters/FiltersList";
import Sort from "../../app/components/sort/Sort";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import CatalogPagination from "../../app/components/pagination/CatalogPagination";
import { TailSpin } from "react-loader-spinner";

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
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
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
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <Sort
            sortOptions={sortOptions}
            selectedValue={productParams.orderBy}
            handleChange={(e) => {
              dispatch(
                catalogActions.setProductParams({ orderBy: e.target.value })
              );
            }}
          />
        </Paper>
        <Paper sx={{ mb: 2 }}>
          {brands.length == 0 ? (
            <TailSpin color="#1976d2" height="25" width="25" />
          ) : (
            <FiltersList
              label="Brands"
              list={brands}
              checkedList={[]}
              handleChange={(items) =>
                dispatch(
                  catalogActions.setProductParams({
                    brands: items,
                    pageNumber: 1,
                  })
                )
              }
            />
          )}
        </Paper>
        <Paper sx={{ mb: 2 }}>
          {types.length == 0 ? (
            <TailSpin color="#1976d2" height="25" width="25" />
          ) : (
            <FiltersList
              label="Type"
              list={types}
              checkedList={[]}
              handleChange={(items) =>
                dispatch(
                  catalogActions.setProductParams({
                    types: items,
                    pageNumber: 1,
                  })
                )
              }
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mt: 2 }}>
        {metaData && (
          <CatalogPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(
                catalogActions.setProductParams({
                  pageNumber: page,
                })
              )
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
