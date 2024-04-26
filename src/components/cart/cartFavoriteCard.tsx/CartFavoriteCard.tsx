import { ReactNode, useState } from 'react';
import { Box, ButtonGroup, Typography, styled } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UiButton from '../../ui/button/UiButton';
import UiDialog from '../../ui/dialog/UiDialog';
import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { AppState, useAppDispatch } from '../../../redux/store';
import { removeFromFavorites } from '../../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout, MUISize } from '../../../misc/types/MUI';
import { CartItemBase } from '../../../misc/types/CartItem';
import { Product } from '../../../misc/types/Product';
import { useTheme } from '../../contextAPI/ThemeContext';
import UiSnackbar from '../../ui/snackbar/UiSnackbar';

type Props = {
  cartItem: CartItemBase;
  onAddToCart: () => void
}

const TitleComponent = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block'
});

export default function CartFavoriteCard(props: Props) {
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const { item } = props.cartItem;
  const { isThemeLight } = useTheme();
  const { cartItems } = useSelector((state: AppState) => state.cartReducer);

  const isInCart = (): boolean => {
    return cartItems.some((cartItem: CartItemBase) => cartItem.item._id === item._id);
  }

  const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar(false);
  };

  const handleDeleteItem = (): void => {
    setShowDeleteDialog(true);
  }

  const handleClose = (shouldDelete: boolean = false): void => {
    setShowDeleteDialog(false);
    if (shouldDelete) {
      dispatch(removeFromFavorites(props.cartItem));
    }
  }

  const dialogTitle = (item: Product): ReactNode => (
    <span>Remove
      <span style={{ fontWeight: 'bold'}}> {item.title} </span> from  
      <span style={{ fontWeight: 'bold'}}> Favorites </span>?
    </span>
  );

  return (
    <>
    <Box minHeight={200} width={200} sx={{ color: isThemeLight ? 'white' : 'black'}}>
      <Box width={200} height={200}>
        <Link to={`/product/${item._id}`}>
        {(item.images && item.images[0]) ?
          <UiImage 
              src={item.images[0]}
              alt={item.title} />
        : <UiNoImage />}
        </Link>
      </Box>
      <Box>
        <Box width={'100%'}>
          <Link to={`/product/${item._id}`} style={{ textDecoration: 'none'}}>
            <TitleComponent fontSize={18} color={isThemeLight ? 'white' : 'black'}>
              {item.title}
            </TitleComponent>
          </Link>
          <TitleComponent fontSize={15} sx={{ color: 'gray'}}>
            {item.category.title}
          </TitleComponent>
        </Box>
        <Box display={'flex'} justifyContent={MUILayout.FLEX_END} width={'100%'} alignItems={'center'}>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <UiButton 
                variant={MUIButtonVariant.TEXT}
                size={MUISize.SMALL}
                color={MUIColor.PRIMARY}
                disabled={isInCart()}>
              <ShoppingCart sx={{ color: 'gray', cursor: 'not-allowed' }} />
            </UiButton>
            
             <UiButton 
                variant={MUIButtonVariant.TEXT}
                size={MUISize.SMALL}
                color={MUIColor.PRIMARY}
                onClick={handleDeleteItem}>
                <DeleteOutlineIcon sx={{ color: (isThemeLight ? 'white' : 'black') }} />
              </UiButton>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>

    <UiSnackbar 
      show={showSnackBar}
      onClose={onSnackbarClose}
      message={snackBarMessage}
    />

    <UiDialog 
      show={showDeleteDialog}
      onClose={handleClose}
      title={dialogTitle(item)}
      cancelTitle='Cancel'
      proceedTitle='Remove'
      proceedColor={MUIColor.ERROR} />
    </>
  )
}