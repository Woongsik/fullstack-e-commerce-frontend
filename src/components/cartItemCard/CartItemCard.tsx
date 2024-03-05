import { useState } from 'react';
import { Box, ButtonGroup, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../redux/store';
import { removeFromCart, updateQuantityInCart } from '../../redux/slices/CartSlice';
import UiFormSelects from '../ui/form/UiFormSelects';
import UiButton from '../ui/button/UiButton';
import UiDialog from '../ui/UiDialog';
import UiImage from '../ui/UiImage';
import { MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI';
import CartItem from '../../misc/types/CartItem';
import { Product } from '../../misc/types/Product';

type Props = {
  cartItem: CartItem;
}

export default function CartItemCard(props: Props) {
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { item, quantity } = props.cartItem;
  
  let quantityItems: {key: number}[] = [];
  for (let i = 0; i < 10; i++) {
    quantityItems[i] = { key: (i+1) };
  }
  
  const handleDeleteItem = () => {
    setShowDeleteDialog(true);
  }

  const handleClose = (shouldDelete: boolean = false) => {
    setShowDeleteDialog(false);
    if (shouldDelete) {
      dispatch(removeFromCart(props.cartItem));
    }
  }

  const handleQuantityChanges = (value: string) => {
    dispatch(updateQuantityInCart({
      ...props.cartItem,
      quantity: parseInt(value)
    }));
  }

  const dialogTitle = (item: Product) => (
    <span>Remove
      <span style={{ fontWeight: 'bold'}}> {item.title} </span> from cart?
    </span>
  );

  return (
    <>
    <Divider />
    <Box display={'flex'} my={1}>
      <Box width={164}>
        <Link to={`/product/${item.id}`}>
          <UiImage 
            src={item.images && item.images[0] ? item.images[0] :''}
            alt={item.title} />
        </Link>
      </Box>
      <Box component={'div'} marginLeft={2} width={'100%'}
            display={'flex'} flexWrap={'wrap'} alignContent={'space-between'}>
        <Box width={'100%'}>
          <Typography component={'h1'} fontSize={20}>
            {item.title}
          </Typography>
          <Typography>
            {item.category.name}
          </Typography>
          <Typography>
            € {item.price}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            {/* if changed, dispatch the change to redux */}
            Quantity:
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
              color={MUIColor.PRIMARY}>
              <FavoriteBorderIcon sx={{ color: 'black' }} />
            </UiButton>
            <UiButton 
              variant={MUIButtonVariant.TEXT}
              size={MUISize.SMALL}
              color={MUIColor.PRIMARY}
              onClick={handleDeleteItem}>
              <DeleteOutlineIcon sx={{ color: 'black' }} />
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
      proceedTitle='Delete'
      proceedColor={MUIColor.ERROR} />
    </>
  )
}