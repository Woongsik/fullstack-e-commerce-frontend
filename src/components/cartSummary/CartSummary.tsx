import CartItem from '../../misc/types/CartItem'
import { Box, Divider, Input, Typography } from '@mui/material'
import UiButton from '../uis/button/UiButton'
import { MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI'

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
          <UiButton
            variant={MUIButtonVariant.CONTAINED}
            size={MUISize.LARGE}
            color={MUIColor.PRIMARY}
            borderRadius={15}
            customStyle={{ my: 1, backgroundColor: 'black', color: 'white', padding: '10px 30px' }}>
            Check out
          </UiButton>
         
          <UiButton 
            variant={MUIButtonVariant.OUTLINED}
            size={MUISize.LARGE}
            color={MUIColor.PRIMARY}
            borderRadius={15}
            customStyle={{ 
              my: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', padding: '10px 30px' 
            }}>
            Paypal
            </UiButton>
          </Box>
    </Box>
  )
}
