import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <ListItem key={product.id}>
      <ListItemAvatar>
        <Avatar alt={product.name} src={product.pictureUrl} />
      </ListItemAvatar>
      <ListItemText>
        {product.name} - {product.price}
      </ListItemText>
    </ListItem>
  );
};

export default ProductCard;
