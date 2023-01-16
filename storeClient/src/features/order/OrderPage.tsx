import {
  Box,
  Table,
  TableCell,
  TableRow,
  Typography,
  TableBody,
  TableHead,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import MUIDataTable, { Responsive, SelectableRows } from "mui-datatables";
import { useEffect } from "react";
import { convertToFixed } from "../../app/utils/utils";
import { useAppDispatch, useAppSelector } from "../../store";
import { getOrders } from "../../store/orderSlice";
import Loader from "../loader/Loader";

// Columns options
const columns = [
  {
    name: "id",
    label: "Order #",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "orderDate",
    label: "Date",
    options: {
      filter: true,
      customBodyRender: (value: any) => {
        return new Date(value).toLocaleString();
      },
    },
  },
  {
    name: "subtotal",
    label: "Subtotal",
    options: {
      filter: true,
      customBodyRender: (value: any) => {
        return convertToFixed(value);
      },
    },
  },
  {
    name: "orderStatus",
    label: "Status",
  },
  {
    name: "total",
    label: "Total",
    options: {
      customBodyRender: (value: any) => {
        return convertToFixed(value);
      },
    },
  },
];
const OrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { order, status } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  //MUI Datatable options
  const options = {
    filter: true,
    selectableRows: "none" as SelectableRows,
    //   filterType: "dropdown",
    responsive: "standard" as Responsive,
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex: number, expandedRows: any) => {
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d: any) => d.dataIndex === dataIndex)
          .length === 0
      )
        return false;
      return true;
    },
    rowsExpanded: [0],
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      const colSpan = rowData.length + 1;
      order![rowMeta.dataIndex];
      return (
        <TableRow>
          <TableCell colSpan={8}>
            <Box sx={{ display: "flex", margin: 1 }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Address:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.fullName}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.addressOne}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.addressTwo}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.city}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.postalCode}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {order![rowMeta.dataIndex].shippingAddress.state}
                  </Typography>
                </CardContent>
              </Card>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Details</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order![rowMeta.dataIndex].orderItems.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell>{convertToFixed(product.price)}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      );
    },
    onRowExpansionChange: (
      curExpanded: any,
      allExpanded: any,
      rowsExpanded: any
    ) => console.log(curExpanded, allExpanded, rowsExpanded),
  };

  if (status.includes("pending")) {
    return <Loader />;
  }
  return (
    order && (
      <MUIDataTable
        title="Orders"
        data={order}
        columns={columns}
        options={options}
      />
    )
  );
};

export default OrderPage;
