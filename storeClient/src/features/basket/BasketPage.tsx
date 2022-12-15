import { useStoreContext } from "../../store/storeContext";
import Loader from "../loader/Loader";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const storeCtx = useStoreContext();
  if (!storeCtx?.basket) {
    return <Loader />;
  }
  if (storeCtx?.basket.items.length === 0) {
    return <h1>Basket is empty</h1>;
  }
  const removeItemHandler = (productId: number, quantity: number) =>
    storeCtx.removeItem(productId, quantity);

  const addItemHandler = (productId: number) => storeCtx.addItem(productId);
  return (
    <BasketTable
      status={storeCtx.status}
      items={storeCtx.basket.items}
      onRemoveItem={removeItemHandler}
      onAddItem={addItemHandler}
    />
  );
};

export default BasketPage;
