import { Order } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import CenteredContainer from '../ui/layout/CenteredContainer';
import { Box, CircularProgress } from '@mui/material';
import { apiService } from '../../services/APIService';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      // const orders: Order[] = apiService.getOrders();
    } catch (e) {
      console.log(e);

    }
  }

  return (
    <CenteredContainer>




    { loading &&
      <CircularProgress />
    }

    { (!loading && error) &&
      <Box>
        {error}
      </Box>
    }
    </CenteredContainer>
  );  
}
