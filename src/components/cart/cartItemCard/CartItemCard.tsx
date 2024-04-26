import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, ButtonGroup, Divider, Typography, styled } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import CenteredContainer from '../../ui/layout/CenteredContainer';
import UiFormSelects from '../../ui/form/UiFormSelects';
import UiButton from '../../ui/button/UiButton';
import UiDialog from '../../ui/dialog/UiDialog';
import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { AppState, useAppDispatch } from '../../../redux/store';
import { addToFavorites, removeFromCart, removeFromFavorites, updateQuantityInCart } from '../../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout, MUISize } from '../../../misc/types/MUI';
import { CartItem, CartItemBase } from '../../../misc/types/CartItem';
import { Product } from '../../../misc/types/Product';
import { useTheme } from '../../contextAPI/ThemeContext';
import UiSnackbar from '../../ui/snackbar/UiSnackbar';

type Props = {
  cartItem: CartItem;
  showDivider: boolean;
}

const TitleComponent = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block'
});

const CartItemContainer = styled(Box)({
  display: 'flex',
  margin: '10px 0',
  width: '100%',
  minHeight: '130px'
});

const CartItemWrapper = styled(Box)({
  marginLeft: '20px',
  width: '65%',
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'space-between'
});

const SizeContainer = styled(Typography)({
  fontSize: '12px',
  margin: '5px 0',
  border: '1px solid gray', 
  padding: '5px 10px'
});

export default function CartItemCard(props: Props) {
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const { item, quantity, size } = props.cartItem;
  const { showDivider } = props;
  const { isThemeLight } = useTheme();
  const { cartFavorites } = useSelector((state: AppState) => state.cartReducer);
  
  let quantityItems: {key: number}[] = [];
  for (let i = 0; i < 10; i++) {
    quantityItems[i] = { key: (i+1) };
  }
  
  const handleDeleteItem = (): void => {
    setShowDeleteDialog(true);
  }

  const handleClose = (shouldDelete: boolean = false): void => {
    setShowDeleteDialog(false);
    if (shouldDelete) {
      dispatch(removeFromCart(props.cartItem));
    }
  }

  const handleQuantityChanges = (value: string): void => {
    dispatch(updateQuantityInCart({
      ...props.cartItem,
      quantity: parseInt(value)
    }));
  }

  const dialogTitle = (item: Product): ReactNode => (
    <span>Remove
      <span style={{ fontWeight: 'bold'}}> {item.title} </span> from 
      <span style={{ fontWeight: 'bold'}}> Cart </span>?
    </span>
  );

  const isFavorited = (): boolean => {
    return cartFavorites.some((favorite: CartItemBase) => favorite.item._id === item._id);
  }

  const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar(false);
  };

  const toggleFavorite = () => {
    let message = `Add to Favorites! (${item.title})`;

    if (isFavorited()) {
      message = `Remove from Favorites! (${item.title})`;
      dispatch(removeFromFavorites(props.cartItem));
    } else {
      dispatch(addToFavorites(props.cartItem));
    }

    setSnackBarMessage(message);
    setShowSnackBar(true)
  }

  return (
    <>
    {showDivider && <Divider sx={{ borderColor: isThemeLight ? 'white' : ''}}/>}
    <CartItemContainer sx={{ color: isThemeLight ? 'white' : 'black'}}>
      <Box width={130}>
        <Link to={`/product/${item._id}`}>
        {(item.images && item.images[0]) ?
          <UiImage 
              src={item.images[0]}
              alt={item.title} />
        : <UiNoImage />}
        </Link>
      </Box>
      <CartItemWrapper component={'div'}>
        <Box width={'100%'}>
          <Link to={`/product/${item._id}`} style={{ textDecoration: 'none'}}>
            <TitleComponent fontSize={18} color={isThemeLight ? 'white' : 'black'}>
              {item.title}
            </TitleComponent>
          </Link>
          <Typography fontSize={15} sx={{ color: 'gray'}}>
            {item.category.title}
          </Typography>
          <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN} width={'100%'}>
            <Typography fontSize={13}>
              € {item.price} x {quantity}
            </Typography>
            <Typography>
              € {item.price * quantity}
            </Typography>
          </CenteredContainer>
        </Box>

        <Box>
          <SizeContainer>
              {size}
          </SizeContainer>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box sx={{ marginRight: 2 }}>Quantity:</Box>
            <UiFormSelects 
              items={quantityItems}  
              displayKey={'key'} 
              valueKey={'key'} 
              size={'small'}
              selectedValue={quantity.toString()}
              onChange={handleQuantityChanges} />
          </Box>

          <ButtonGroup variant="text" aria-label="Basic button group">
            <UiButton 
              variant={MUIButtonVariant.TEXT}
              size={MUISize.SMALL}
              color={MUIColor.PRIMARY}
              onClick={toggleFavorite}>
              {isFavorited() ? 
              <FavoriteIcon sx={{ color: 'red' }} />
              : <FavoriteBorderIcon sx={{ color: isFavorited() ? 'red': (isThemeLight ? 'white' : 'black') }} />
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
      </CartItemWrapper>

      <UiSnackbar 
        show={showSnackBar}
        onClose={onSnackbarClose}
        message={snackBarMessage}
      />
    </CartItemContainer>

    <UiDialog 
      show={showDeleteDialog}
      onClose={handleClose}
      title={dialogTitle(item)}
      cancelTitle='Cancel'
      proceedTitle='Delete'
      proceedColor={MUIColor.ERROR} />
    </>
  )
}