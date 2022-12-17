import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../store";
import { addBasketItemAsync } from "../../store/basketSlice";
import { fetchProductAsync, productSelectors } from "../../store/catalogSlice";
import Loader from "../loader/Loader";

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id!);

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId)
  );
  const { status } = useAppSelector((state) => state.catalog);
  const { status: basketStatus } = useAppSelector((state) => state.basket);
  const addItemHandler = () => {
    dispatch(addBasketItemAsync({ productId: productId }));
  };

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductAsync(productId));
    }
  }, [product, dispatch]);

  if (status.includes("pending")) {
    return <Loader />;
  }
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Paper elevation={1} sx={{ my: 10, width: "100%" }}>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{ minWidth: "100%" }}
            variant="contained"
            onClick={addItemHandler}
          >
            {basketStatus.includes("pending") ? (
              <TailSpin
                height="21"
                width="21"
                color="blue"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Add item"
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetails;
