import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material/";
import { BasketItem } from "../../app/models/basket";

interface Props {
  items: BasketItem[];
  onRemoveItem: (productId: number, quantity: number) => void;
  onAddItem: (productId: number) => void;
}

const TAX_RATE = 0.07;

const ccyFormat = (num: number) => {
  return `${(num / 100).toFixed(2)}`;
};
function sumRow(qty: number, unit: number) {
  return qty * unit;
}
const subtotal = (items: readonly BasketItem[]) => {
  return items
    .map(({ price, quantity }) => sumRow(price, quantity))
    .reduce((sum, i) => sum + i, 0);
};

const BasketTable: React.FC<Props> = ({ items, onRemoveItem, onAddItem }) => {
  const invoiceSubtotal = subtotal(items);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="basket table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span> {item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onRemoveItem(item.productId, 1)}
                >
                  <Remove />
                </IconButton>
                {item.quantity}
                <IconButton
                  color="error"
                  onClick={() => onAddItem(item.productId)}
                >
                  <Add />
                </IconButton>
              </TableCell>
              <TableCell align="right">{ccyFormat(item.price)}</TableCell>
              <TableCell align="right">
                {ccyFormat(sumRow(item.price, item.quantity))}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onRemoveItem(item.productId, item.quantity)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">
              {`${(TAX_RATE * 100).toFixed(0)} %`}
            </TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BasketTable;
