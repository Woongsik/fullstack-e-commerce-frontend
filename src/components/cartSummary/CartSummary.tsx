import CartItem from '../../misc/types/CartItem'
import { Box, Divider, Input, Typography } from '@mui/material'
import UiButton from '../uis/button/UiButton'
import { MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI'
import UiRoundButton from '../uis/button/UiRoundButton'

type Props = {
  cartItems: CartItem[],
  onCheckout: () => void
}

export default function CartSummary(props: Props) {
  const subTotal: number = props.cartItems.reduce((acc, cartItem) => {
    acc += (cartItem.item.price * cartItem.quantity);
    return acc;
  }, 0);

  const deliveryFee: number = subTotal > 0 ? 5 : 0;
  const total: number = deliveryFee + subTotal;

  return (
    <Box justifyContent={'center'} width={'100%'}>
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
        <Box>Sub total: </Box> <Box> € { subTotal }</Box>
      </Box>
      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Esitmated delivery & handling: </Box> <Box> € {deliveryFee}</Box>
      </Box>

      <Divider />

      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Total:</Box> <Box>€ {total}</Box>
      </Box>

      <Box component={'div'} display={'inline-grid'} justifyContent={'center'} width={'100%'}
            my={5}>
        <UiRoundButton 
          variant={MUIButtonVariant.CONTAINED}
          theme='black'
          onClick={() => props.onCheckout()}>
          Check out
        </UiRoundButton>

        <UiRoundButton 
          variant={MUIButtonVariant.OUTLINED}
          theme='white'
          margin={'20px 0'}>
          Paypal
        </UiRoundButton>
      </Box>
    </Box>
  )
}
