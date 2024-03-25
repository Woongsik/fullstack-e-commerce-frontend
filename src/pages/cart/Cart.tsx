import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import CartItemCard from '../../components/cart/cartItemCard/CartItemCard';
import CartSummary from '../../components/cart/cartSummary/CartSummary';
import CartItem from '../../misc/types/CartItem';
import { AppState, useAppDispatch } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../misc/types/MUI';
import { clearCart } from '../../redux/slices/CartSlice';
import UiButton from '../../components/ui/button/UiButton';
import { useTheme } from '../../components/contextAPI/ThemeContext';
import CartFavoriteCard from '../../components/cart/cartFavoriteCard.tsx/CartFavoriteCard';

export default function Cart() {
  const [checkedout, setCheckedout] = useState<boolean>(false);
  const { cartItems, cartFavorites } = useSelector((state: AppState) => state.cartReducer);
  useUserSession();

  const dispatch = useAppDispatch();
  const { isThemeLight } = useTheme();

  const handleCheckout = () => {
    setCheckedout(true);
    dispatch(clearCart());
  }

  const addToCartFromFavorite = () => {
    setCheckedout(false);
  }

  return (
    <GridContainer alignItems={checkedout ? MUILayout.CENTER : MUILayout.FLEX_START} sx={{ color: isThemeLight ? 'white' : 'black' }}>
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
        <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN} width={'75%'} sx={{ maxWidth: '1000px'}} margin='50px 0'>
          <CenteredContainer width={'50%'} justifyContent={MUILayout.FLEX_START} sx={{ minWidth: '300px', maxWidth: '450px', marginBottom: '30px'}}>
            <Box width={'100%'}>
              <Typography fontSize={22} fontWeight={'bold'}>
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Typography>
              <Divider sx={{ borderColor: isThemeLight ? 'white' : 'black' }}/>
              {cartItems.map((cartItem: CartItem, index: number) =>
                <CartItemCard 
                  key={cartItem.item.id} 
                  cartItem={cartItem}
                  showDivider={index !== 0} />   
              )}
              {cartItems.length === 0 && <h4>No items yet...</h4>}
            </Box>
          </CenteredContainer>

          <CenteredContainer width={'40%'} sx={{ minWidth: '300px', maxWidth: '400px', position: 'sticky', top: '0'}}>
            <CartSummary 
              cartItems={cartItems}
              onCheckout={handleCheckout} />
          </CenteredContainer>
        </CenteredContainer>
      }

      <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.FLEX_START} width={'75%'} sx={{ maxWidth: '1000px'}} margin='50px 0'>
        <CenteredContainer width={'100%'} justifyContent={MUILayout.FLEX_START}>
          <Box width={'100%'}>
            <Typography fontSize={22} fontWeight={'bold'}>
              Favorites {cartFavorites.length > 0 && `(${cartFavorites.length})`}
            </Typography>
            <Divider sx={{ borderColor: isThemeLight ? 'white' : 'black' }}/>
            <Stack direction="row" spacing={2} overflow={'auto'} display={'-webkit-box'} padding={'10px 15px 10px 0'}>
              {cartFavorites.map((cartItem: CartItem, index: number) =>
              <CartFavoriteCard  
                key={cartItem.item.id}
                cartItem={cartItem}
                onAddToCart={addToCartFromFavorite}
              />               
              )}
            </Stack>
            {cartFavorites.length === 0 && <h4>No favorite items yet...</h4>}
          </Box>
        </CenteredContainer>    
      </CenteredContainer>
    </GridContainer>
  )
}
