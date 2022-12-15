import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Product } from "../../app/models/product";
import api from "../../app/utils/api";
import { useStoreContext } from "../../store/storeContext";

const ProductDetails: React.FC = () => {
  const storeCtx = useStoreContext();
  const product = useLoaderData() as Product;

  return (
    <Paper elevation={1} sx={{ my: 10, width: "100%" }}>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{ minWidth: "100%" }}
            variant="contained"
            onClick={() => storeCtx?.addItem(product.id)}
          >
            Add item
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetails;

export const loader = ({ params }: any) => {
  const { id } = params;
  return api.Catalog.getProductById(id);
};
