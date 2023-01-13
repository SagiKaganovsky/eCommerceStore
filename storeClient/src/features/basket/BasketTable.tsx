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
import { TailSpin } from "react-loader-spinner";
import { BasketItem } from "../../app/models/basket";

interface Props {
  reviewMode: boolean;
  items: BasketItem[];
  status: string;
  onRemoveItem?: (productId: number, quantity: number, action: string) => void;
  onAddItem?: (productId: number) => void;
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

const BasketTable: React.FC<Props> = ({
  items,
  status,
  onRemoveItem,
  onAddItem,
  reviewMode,
}) => {
  const invoiceSubtotal = subtotal(items);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const Spinner = () => (
    <TailSpin
      height="21"
      width="21"
      color="red"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="basket table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="center">Price</TableCell>
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
                <Box>
                  {!reviewMode && (
                    <IconButton
                      color="error"
                      onClick={() => onRemoveItem(item.productId, 1, "Remove")}
                    >
                      {status.includes(
                        "pendingRemoveItemRemove" + item.productId
                      ) ? (
                        <Spinner />
                      ) : (
                        <Remove />
                      )}
                    </IconButton>
                  )}
                  {item.quantity}
                  {!reviewMode && (
                    <IconButton
                      color="error"
                      onClick={() => onAddItem(item.productId)}
                    >
                      {status.includes("pendingAddItem" + item.productId) ? (
                        <Spinner />
                      ) : (
                        <Add />
                      )}
                    </IconButton>
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">{ccyFormat(item.price)}</TableCell>
              <TableCell align="right">
                {ccyFormat(sumRow(item.price, item.quantity))}
              </TableCell>
              <TableCell align="center">
                {!reviewMode && (
                  <IconButton
                    color="error"
                    onClick={() =>
                      onRemoveItem(item.productId, item.quantity, "Delete")
                    }
                  >
                    {status.includes(
                      "pendingRemoveItemDelete" + item.productId
                    ) ? (
                      <Spinner />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                )}
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
