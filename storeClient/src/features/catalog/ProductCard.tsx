// import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Product } from "../../app/models/product";
import api from "../../app/utils/api";
import { useAppDispatch } from "../../store";
import { basketActions } from "../../store/basketSlice";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addItemHandler = async () => {
    setLoading(true);
    const data = await api.Basket.addItem(product.id);
    dispatch(basketActions.setBasket(data));
    setLoading(false);
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={() => navigate(`/catalog/${product.id}`)}>
        <CardHeader
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main", fontSize: "15px" },
          }}
        />
        <CardMedia
          component="img"
          image={product.pictureUrl}
          alt={product.name}
          sx={{
            bgcolor: "primary.light",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          <Button size="small" onClick={addItemHandler}>
            {!loading ? (
              "Add to cart"
            ) : (
              <Bars
                height="20"
                width="30"
                color="#1976d2"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </Button>
        }
      </CardActions>
    </Card>
  );
};

export default ProductCard;
