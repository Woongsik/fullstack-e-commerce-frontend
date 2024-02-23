import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';

import CartItemCard from '../../components/cartItemCard/CartItemCard';
import CartItem from '../../misc/types/CartItem';
import { AppState } from '../../redux/store';

export default function Cart() {
  const { cartProducts, cartFavorites} = useSelector((state: AppState) => state.cartReducer);

  return (
    <Box component={'div'}>
      <Divider />
      <Box component={'div'} margin={5} display={'flex'} justifyContent={'center'}>
        <Box component={'div'} 
             justifyContent={'center'} 
             alignItems={'center'}
            width={'40%'}>
          <Typography component={'h1'} fontSize={22}>
            Cart
          </Typography>
          {cartProducts.map((cartItem: CartItem) =>
            <CartItemCard key={cartItem.item.id} cartItem={cartItem} />   
          )}
        </Box>
        <Box component={'div'}>
          Summary
        </Box>
      </Box>
    </Box>
  )
}
