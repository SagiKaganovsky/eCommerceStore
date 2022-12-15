import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../app/models/basket";
import api from "../app/utils/api";

interface StoreContextValue {
  basket: Basket | null;
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

export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    api.Basket.removeItem(productId, quantity);
    if (!basket) {
      return;
    }
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
  };
  const addItem = async (productId: number) => {
    const data = await api.Basket.addItem(productId);
    setBasket(data);
  };
  const StoreValue = {
    basket,
    setBasket,
    removeItem,
    addItem,
  };
  return (
    <StoreContext.Provider value={StoreValue}>{children}</StoreContext.Provider>
  );
};
