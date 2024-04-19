import { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import CenteredContainer from '../../ui/layout/CenteredContainer';
import { apiService } from '../../../services/APIService';
import { Order } from '../../../misc/types/Order';
import { OrderDetailRow } from './OrderDetailRow';
import LoadingAndMessage from '../../ui/loadingAndMessage/LoadingAndMessage';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);
      const orders: Order[] = await apiService.getOrders();
      setOrders(orders);
    } catch (e) {
      const error = e as Error;
      setError(`${error.message}`);
    }

    setLoading(false);
  }

  return (
    <CenteredContainer width='100%'>
    {(orders && orders.length > 0) &&
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order date</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Total&nbsp;(€)</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <OrderDetailRow key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    <LoadingAndMessage loading={loading} error={error} />
    </CenteredContainer>
  );  
}
