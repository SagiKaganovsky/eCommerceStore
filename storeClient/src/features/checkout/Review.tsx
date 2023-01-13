import { Typography } from "@mui/material";
import { useAppSelector } from "../../store";
import BasketTable from "../basket/BasketTable";

const Review: React.FC = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <BasketTable status={status} items={basket!.items} reviewMode />
    </>
  );
};

export default Review;
