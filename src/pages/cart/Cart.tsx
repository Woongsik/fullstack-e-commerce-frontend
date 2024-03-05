import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';

import CartItemCard from '../../components/cartItemCard/CartItemCard';
import CartSummary from '../../components/cartSummary/CartSummary';
import CartItem from '../../misc/types/CartItem';
import { AppState } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/uis/layout/GridContainer';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';

export default function Cart() {
  const { cartItems, cartFavorites} = useSelector((state: AppState) => state.cartReducer);
  useUserSession();

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN} width={'75%'}>
        <CenteredContainer width={'50%'} justifyContent={MUILayout.FLEX_START} sx={{ minWidth: '300px', marginBottom: '30px'}}>
          <Box width={'100%'}>
            <Typography fontSize={22} fontWeight={'bold'}>
              Cart
            </Typography>
            <Divider />
            {cartItems.map((cartItem: CartItem, index: number) =>
              <CartItemCard 
                key={cartItem.item.id} 
                cartItem={cartItem}
                showDivier={index !== 0} />   
            )}
            {cartItems.length === 0 && <h4>No items yet...</h4>}
            </Box>
        </CenteredContainer>

        <CenteredContainer width={'40%'} sx={{ minWidth: '300px'}}>
          <CartSummary cartItems={cartItems} />
        </CenteredContainer>
      </CenteredContainer>
    </GridContainer>
  )
}
