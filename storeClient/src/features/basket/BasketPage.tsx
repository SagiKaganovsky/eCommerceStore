import { useStoreContext } from "../../store/storeContext";
import Loader from "../loader/Loader";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const storeCtx = useStoreContext();
  if (!storeCtx?.basket) {
    return <Loader />;
  }
  return <BasketTable items={storeCtx.basket.items} />;
};

export default BasketPage;
