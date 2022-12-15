import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../app/models/basket";
import { Status } from "../app/models/status";
import api from "../app/utils/api";

interface StoreContextValue {
  basket: Basket | null;
  status: Status;
  setBasket: (basket: Basket | null) => void;
  removeItem: (productId: number, quantity: number) => void;
  addItem: (productId: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  return context;
};
const initialStatusState = {
  loading: false,
  productId: -1,
  action: "",
};
export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null);
  const [status, setStatus] = useState<Status>(initialStatusState);
  const removeItem = async (productId: number, quantity: number) => {
    if (!basket) {
      return;
    }
    setStatus({ loading: true, productId: productId, action: "remove" });
    const items = [...basket.items];
    const existingItemIndex = items.findIndex(
      (item) => item.productId === productId
    );
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity -= quantity;
      if (items[existingItemIndex].quantity === 0) {
        items.splice(existingItemIndex, 1);
      }
      setBasket((prevState) => {
        let newState = null;
        if (items && prevState) {
          newState = { ...prevState, items };
        }
        return newState;
      });
    }
    await api.Basket.removeItem(productId, quantity);
    setStatus(initialStatusState);
  };
  const addItem = async (productId: number) => {
    setStatus({ loading: true, productId: productId, action: "add" });
    const data = await api.Basket.addItem(productId);
    setBasket(data);
    setStatus(initialStatusState);
  };
  const StoreValue = {
    basket,
    status,
    setBasket,
    removeItem,
    addItem,
    setStatus,
  };
  return (
    <StoreContext.Provider value={StoreValue}>{children}</StoreContext.Provider>
  );
};
