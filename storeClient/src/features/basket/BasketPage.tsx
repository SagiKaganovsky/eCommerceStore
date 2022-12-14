import { useLoaderData } from "react-router-dom";
import { Basket } from "../../app/models/basket";
import api from "../../app/utils/api";

const BasketPage = () => {
  const basket = useLoaderData() as Basket;
  return (
    <ul>
      {basket.items.map((item) => (
        <li key={item.productId}>{item.name}</li>
      ))}
    </ul>
  );
};

export default BasketPage;

export const loader = () => {
  return api.Basket.get();
};
