import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../app/models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
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
        items.slice(existingItemIndex, 1);
      }
      setBasket((prevState) => {
        if (items && prevState) {
          prevState.items = items;
        }
        return prevState;
      });
    }
  };
  const StoreValue = {
    basket,
    setBasket,
    removeItem,
  };
  return (
    <StoreContext.Provider value={StoreValue}>{children}</StoreContext.Provider>
  );
};
