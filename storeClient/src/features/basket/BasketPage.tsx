import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../app/utils/api";
import { useAppDispatch, useAppSelector } from "../../store";
import { basketActions, initialStatusState } from "../../store/basketSlice";
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
  const removeItemHandler = async (
    productId: number,
    quantity: number,
    action: string
  ) => {
    dispatch(
      basketActions.setStatus({
        loading: true,
        productId: productId,
        action: action,
      })
    );
    await api.Basket.removeItem(productId, quantity);
    dispatch(basketActions.removeItem({ productId, quantity }));
    dispatch(basketActions.setStatus(initialStatusState));
  };

  const addItemHandler = async (productId: number) => {
    dispatch(
      basketActions.setStatus({
        loading: true,
        productId: productId,
        action: "add",
      })
    );
    const data = await api.Basket.addItem(productId);
    dispatch(basketActions.setBasket(data));
    dispatch(basketActions.setStatus(initialStatusState));
  };
  return (
    <>
      <BasketTable
        status={status}
        items={basket.items}
        onRemoveItem={removeItemHandler}
        onAddItem={addItemHandler}
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
