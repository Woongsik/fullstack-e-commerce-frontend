import React from 'react'
import CartItem from '../../misc/types/CartItem'
import { Box, Button, Divider, Input, Typography } from '@mui/material'

type Props = {
  cartItems: CartItem[]
}

export default function CartSummary(props: Props) {
  const subTotal: number = props.cartItems.reduce((acc, cartItem) => {
    acc += (cartItem.item.price * cartItem.quantity);
    return acc;
  }, 0);

  const deliveryFee: number = subTotal > 0 ? 5 : 0;
  const total: number = deliveryFee + subTotal;

  return (
    <Box justifyContent={'center'} minWidth={300}>
      <Typography fontSize={22} fontWeight={'bold'}> 
        Summary
      </Typography>

      <Divider />
      
      <Box my={2} display={'block'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Do you have a promo code? </Box> 
        <Box>
          <Input fullWidth/>
        </Box>
      </Box>
      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Sub total: </Box> <Box> { subTotal }</Box>
      </Box>
      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Esitmated delivery & handling: </Box> <Box> {deliveryFee}</Box>
      </Box>

      <Divider />

      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Total:</Box> <Box>{total}</Box>
      </Box>

      <Box component={'div'} display={'inline-grid'} justifyContent={'center'} width={'100%'}
            my={5}>
          <Button
            disableRipple
            disableTouchRipple
            sx={{ my: 1, backgroundColor: 'black', color: 'white', borderRadius: 15, padding: '10px 30px' }}
            component="label"
            role={'button'}
            variant="contained"
            tabIndex={-1}
            size={'large'}>
            Check out
          </Button>
          <Button 
            sx={{ my: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', borderRadius: 15, padding: '10px 30px' }}
            disableRipple
            disableTouchRipple
            component="label"
            role={'button'}
            variant="outlined"
            tabIndex={-1}
            size={'large'}>
            Paypal
          </Button>
          </Box>
    </Box>
  )
}
