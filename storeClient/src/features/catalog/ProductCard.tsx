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
import { useNavigate } from "react-router-dom";
import { Product } from "../../app/models/product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
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
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
