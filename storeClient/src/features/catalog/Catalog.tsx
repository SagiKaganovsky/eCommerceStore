import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Product } from "../../app/models/product";

const Catalog: React.FC<{ products: Product[] }> = (props) => {
  return (
    <List>
      {props.products.map((product: Product) => (
        <ListItem key={product.id}>
          <ListItemAvatar>
            <Avatar alt={product.name} src={product.pictureUrl} />
          </ListItemAvatar>
          <ListItemText>
            {product.name} - {product.price}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Catalog;
