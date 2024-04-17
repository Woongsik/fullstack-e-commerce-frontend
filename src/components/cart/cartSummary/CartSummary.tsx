import { CartItem } from '../../../misc/types/CartItem'
import { Box, Divider, Input, Typography, styled } from '@mui/material'
import { MUIButtonVariant } from '../../../misc/types/MUI'
import UiRoundButton from '../../ui/button/UiRoundButton'
import { useTheme } from '../../contextAPI/ThemeContext'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/store'

type Props = {
  cartItems: CartItem[],
  onCheckout: () => void
}

export default function CartSummary(props: Props) {
  const { isThemeLight } = useTheme();
  const { total, deliveryFee } = useSelector((state: AppState) => state.cartReducer);

  const ThemeDivider = styled(Divider)({
    borderColor: isThemeLight ? 'white' : 'black'
  });
  
  const textFieldCss = {
    '&.MuiFormControl-root > *': {
      color: isThemeLight ? 'white': '',
      borderColor: isThemeLight ? 'black': '',
    }
  };

  const SummaryItem = styled(Box)({
    marginTop: '15px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });

  const SummaryPromo = styled(SummaryItem)({
    display: 'block'
  });

  return (
    <Box justifyContent={'center'} width={'100%'}>
      <Typography fontSize={22} fontWeight={'bold'}> 
        Summary
      </Typography>

      <ThemeDivider />
      
      <SummaryPromo>
        <Box>Do you have a promo code? </Box> 
        <Box>
          <Input fullWidth sx={{
            color: isThemeLight ? 'white' : '',
            '&.MuiInputBase-root': {
              borderBottom: isThemeLight ? '1px solid white': ''
            }
          }}/>
        </Box>
      </SummaryPromo>
      <SummaryItem>
        <Box>Sub total: </Box> <Box> € { total > 0 ? (total - deliveryFee) : 0 }</Box>
      </SummaryItem>
      <SummaryItem>
        <Box>Esitmated delivery & handling: </Box> <Box> € {deliveryFee}</Box>
      </SummaryItem>

      <ThemeDivider />

      <SummaryItem>
        <Box>Total:</Box> <Box>€ {total}</Box>
      </SummaryItem>

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
