import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../../store/basketSlice";
import Loader from "../loader/Loader";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  if (!basket) {
    return <Loader />;
  }
  if (basket.items.length === 0) {
    return <h1>Basket is empty</h1>;
  }
  const removeItemHandler = (
    productId: number,
    quantity: number,
    action: string
  ) => {
    dispatch(removeBasketItemAsync({ productId, quantity, action }));
  };

  const addItemHandler = (productId: number) => {
    dispatch(addBasketItemAsync({ productId }));
  };
  return (
    <>
      <BasketTable
        status={status}
        items={basket.items}
        onRemoveItem={removeItemHandler}
        onAddItem={addItemHandler}
        reviewMode={false}
      />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button component={Link} to="/checkout" variant="contained" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
