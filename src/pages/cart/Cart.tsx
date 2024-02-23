import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import CartItemCard from '../../components/cartItemCard/CartItemCard';
import CartSummary from '../../components/cartSummary/CartSummary';
import CartItem from '../../misc/types/CartItem';
import { AppState } from '../../redux/store';

export default function Cart() {
  const { cartItems, cartFavorites} = useSelector((state: AppState) => state.cartReducer);

  return (
    <Box component={'div'} minHeight={'83vh'}>
      <Box component={'div'} minHeight={'82vh'} alignContent={'center'} margin={5} display={'flex'} justifyContent={'center'}>
        <Box component={'div'} 
             justifyContent={'center'} 
             alignItems={'center'}
            width={'40%'}>
          <Typography component={'h1'} fontSize={22}>
            Cart
          </Typography>
          {cartItems.map((cartItem: CartItem) =>
            <CartItemCard key={cartItem.item.id} cartItem={cartItem} />   
          )}
          {cartItems.length === 0 && <h3>No items yet...</h3>}
        </Box>
        <Box marginLeft={5} display={'flex'} alignContent={'center'}>
          <CartSummary cartItems={cartItems} />
        </Box>
      </Box>
    </Box>
  )
}
