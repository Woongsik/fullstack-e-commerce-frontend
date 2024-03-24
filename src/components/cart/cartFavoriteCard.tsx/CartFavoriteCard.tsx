import { ReactNode, useState } from 'react';
import { Box, ButtonGroup, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import UiButton from '../../ui/button/UiButton';
import UiDialog from '../../ui/UiDialog';
import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { AppState, useAppDispatch } from '../../../redux/store';
import { addToCart, removeFromFavorites } from '../../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout, MUISize } from '../../../misc/types/MUI';
import CartItem from '../../../misc/types/CartItem';
import { Product } from '../../../misc/types/Product';
import { useTheme } from '../../contextAPI/ThemeContext';
import { ShoppingCart, ShoppingCartCheckout, ShoppingCartOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

type Props = {
  cartItem: CartItem;
}

export default function CartFavoriteCard(props: Props) {
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { item } = props.cartItem;
  const { isThemeLight } = useTheme();
  const { cartItems } = useSelector((state: AppState) => state.cartReducer);

  const isInCart = (): boolean => {
    return cartItems.some((cartItem: CartItem) => cartItem.item.id === item.id);
  }

  const handleAddItem = () => {
    if(!isInCart()) {
      dispatch(addToCart(props.cartItem));
    } else {
      alert('Already added to the cart!');
    }
  }

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
    <Box minHeight={200} sx={{ color: isThemeLight ? 'white' : 'black'}}>
      <Box width={200} height={200}>
        <Link to={`/product/${item.id}`}>
        {(item.images && item.images[0]) ?
          <UiImage 
              src={item.images[0]}
              alt={item.title} />
        : <UiNoImage />}
        </Link>
      </Box>
      <Box>
        <Box width={'100%'}>
          <Link to={`/product/${item.id}`} style={{ textDecoration: 'none'}}>
            <Typography fontSize={18} color={isThemeLight ? 'white' : 'black'}>
              {item.title}
            </Typography>
          </Link>
          <Typography fontSize={15} sx={{ color: 'gray'}}>
            {item.category.name}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={MUILayout.FLEX_END} width={'100%'} alignItems={'center'}>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <UiButton 
                variant={MUIButtonVariant.TEXT}
                size={MUISize.SMALL}
                color={MUIColor.PRIMARY}
                onClick={handleAddItem}>
                {isInCart() ? <ShoppingCart sx={{ color: 'red' }} />
                :  <ShoppingCartCheckout sx={{ color: (isThemeLight ? 'white' : 'black') }} />
              }
                
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