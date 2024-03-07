import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';

import CartItemCard from '../../components/cart/cartItemCard/CartItemCard';
import CartSummary from '../../components/cart/cartSummary/CartSummary';
import CartItem from '../../misc/types/CartItem';
import { AppState, useAppDispatch } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../misc/types/MUI';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { clearCart } from '../../redux/slices/CartSlice';
import { Link } from 'react-router-dom';
import UiButton from '../../components/ui/button/UiButton';

export default function Cart() {
  const [checkedout, setCheckedout] = useState<boolean>(false);
  const { cartItems } = useSelector((state: AppState) => state.cartReducer);
  useUserSession();

  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    setCheckedout(true);
    dispatch(clearCart());
  }

  return (
    <GridContainer alignItems={checkedout ? MUILayout.CENTER : MUILayout.FLEX_START}>
      {
        checkedout ? 
        <CenteredContainer width={'75%'}>
          <CenteredContainer>
            <LocalShippingIcon sx={{ fontSize: 60 }}/>
            <Typography fontWeight={'bold'} fontSize={22} width={'100%'} textAlign={'center'}>
              Thank you for your order! We will handle it soon.
            </Typography>
            <Link to={'/home'}>
              <UiButton variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} customStyle={{ margin: '15px' }}>
                Back home
              </UiButton>
            </Link>        
          </CenteredContainer>
        </CenteredContainer> 
        :
        <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN} width={'75%'} sx={{ maxWidth: '1000px' }} margin='50px 0'>
          <CenteredContainer width={'50%'} justifyContent={MUILayout.FLEX_START} sx={{ minWidth: '300px', maxWidth: '450px', marginBottom: '30px'}}>
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

          <CenteredContainer width={'40%'} sx={{ minWidth: '300px', maxWidth: '400px'}}>
            <CartSummary 
              cartItems={cartItems}
              onCheckout={handleCheckout} />
          </CenteredContainer>
        </CenteredContainer>
      }
    </GridContainer>
  )
}
