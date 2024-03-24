import CartItem from '../../../misc/types/CartItem'
import { Box, Divider, Input, Typography, styled } from '@mui/material'
import { MUIButtonVariant } from '../../../misc/types/MUI'
import UiRoundButton from '../../ui/button/UiRoundButton'
import { useTheme } from '../../contextAPI/ThemeContext'

type Props = {
  cartItems: CartItem[],
  onCheckout: () => void
}

export default function CartSummary(props: Props) {
  const { isThemeLight } = useTheme();
  const subTotal: number = props.cartItems.reduce((acc, cartItem) => {
    acc += (cartItem.item.price * cartItem.quantity);
    return acc;
  }, 0);

  const deliveryFee: number = subTotal > 0 ? 5 : 0;
  const total: number = deliveryFee + subTotal;

  const ThemeDivider = styled(Divider)({
    borderColor: isThemeLight ? 'white' : 'black'
  });

  return (
    <Box justifyContent={'center'} width={'100%'}>
      <Typography fontSize={22} fontWeight={'bold'}> 
        Summary
      </Typography>

      <ThemeDivider />
      
      <Box my={2} display={'block'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Do you have a promo code? </Box> 
        <Box>
          <Input fullWidth sx={{
            color: isThemeLight ? 'white' : 'black',
            '&.MuiInputBase-root': {
              borderBottom: isThemeLight ? '1px solid white': '1px solid black'
            }
          }}/>
        </Box>
      </Box>
      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Sub total: </Box> <Box> € { subTotal }</Box>
      </Box>
      <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>Esitmated delivery & handling: </Box> <Box> € {deliveryFee}</Box>
      </Box>

      <ThemeDivider />

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
