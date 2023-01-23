import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { convertToFixed } from "../../app/utils/utils";
import useProducts from "../../app/hooks/useProducts";
import CatalogPagination from "../../app/components/pagination/CatalogPagination";
import { useAppDispatch } from "../../store";
import { catalogActions } from "../../store/catalogSlice";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "../../app/models/product";

const Inventory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, metaData } = useProducts();
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleHideProductForm = () => {
    setShowProductForm(false);
    setSelectedProduct(undefined);
  };

  if (showProductForm) {
    return (
      <ProductForm
        product={selectedProduct}
        hideProductForm={handleHideProductForm}
      />
    );
  }
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setShowProductForm(true)}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {convertToFixed(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                  />
                  <Button startIcon={<Delete />} color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <CatalogPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(
                catalogActions.setProductParams({
                  pageNumber: page,
                })
              )
            }
          />
        </Box>
      )}
    </>
  );
};
export default Inventory;
