import { useLoaderData } from "react-router-dom";
import { Basket } from "../../app/models/basket";
import api from "../../app/utils/api";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const basket = useLoaderData() as Basket;
  return <BasketTable items={basket.items} />;
};

export default BasketPage;

export const loader = () => {
  return api.Basket.get();
};
