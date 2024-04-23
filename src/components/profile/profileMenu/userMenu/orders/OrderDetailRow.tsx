import React, { useState } from 'react'
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, TableFooter, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

import { Order, OrderItem, OrderStatus } from '../../../../../misc/types/Order';
import { convertDateToString } from '../../../../../misc/utils/DateUtil';
import { MUIColor } from '../../../../../misc/types/MUI';

type Props = {
  order: Order
}

export function OrderDetailRow(props: Props) {
  const { order } = props;
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { shippingAddress } = order;
  const convertedAddress: string = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.postnumber}, ${shippingAddress.country}`;
  const statusColor = (status: OrderStatus): MUIColor => {
    if (status === OrderStatus.Prepare) {
      return MUIColor.SECONDARY;
    } else if (status === OrderStatus.OnDelivery) {
      return MUIColor.WARNING;
    } else if (status === OrderStatus.Delivered) {
      return MUIColor.PRIMARY
    }

    return MUIColor.ERROR;
  } 
  
  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {convertDateToString(order.createdAt)}
        </TableCell>
        <TableCell align="right">{order.items.length}</TableCell>
        <TableCell align="right">{order.totalPrice}</TableCell>
        <TableCell align="center">
          <Chip 
            label={order.status.toUpperCase()} 
            variant='outlined'
            color={statusColor(order.status)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginBottom={5} marginTop={2}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Qunatity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item: OrderItem) => 
                    <TableRow key={item.product._id} onClick={() => handleClick(item.product._id)}
                        sx={{ cursor: 'pointer'}}>
                        <TableCell component="th" scope="row">                        
                          <img src={item.product.images[0]} height={'50px'} width={'50px'} />
                        </TableCell>
                        <TableCell>
                          {item.product.title}
                        </TableCell>
                        <TableCell align="center">{item.size}</TableCell>
                        <TableCell align="right">{item.product.price}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.quantity * item.product.price}</TableCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Delivery & Handling
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <h3 style={{ margin: 0 }}>Total</h3>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <span style={{ fontWeight: 'bold'}}>€ {order.totalPrice}</span>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      <h3 style={{ margin: 0 }}>Delivery to</h3>
                    </TableCell>
                    <TableCell colSpan={5} align="right">
                      <span style={{ fontWeight: 'bold'}}>{convertedAddress}</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
