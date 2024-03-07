import { useState } from 'react';
import { Box, ButtonGroup, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

import CenteredContainer from '../../ui/layout/CenteredContainer';
import UiFormSelects from '../../ui/form/UiFormSelects';
import UiButton from '../../ui/button/UiButton';
import UiDialog from '../../ui/UiDialog';
import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { useAppDispatch } from '../../../redux/store';
import { removeFromCart, updateQuantityInCart } from '../../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout, MUISize } from '../../../misc/types/MUI';
import CartItem from '../../../misc/types/CartItem';
import { Product } from '../../../misc/types/Product';

type Props = {
  cartItem: CartItem;
  showDivier: boolean;
}

export default function CartItemCard(props: Props) {
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const { item, quantity } = props.cartItem;
  const { showDivier } = props;
  
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
    {showDivier && <Divider />}
    <Box display={'flex'} my={1} width={'100%'} minHeight={130}>
      <Box width={130}>
        <Link to={`/product/${item.id}`}>
        {(item.images && item.images[0]) ?
          <UiImage 
              src={item.images[0]}
              alt={item.title} />
        : <UiNoImage />}
        </Link>
      </Box>
      <Box component={'div'} marginLeft={2} width={'65%'}
            display={'flex'} flexWrap={'wrap'} alignContent={'space-between'}>
        <Box width={'100%'}>
          <Link to={`/product/${item.id}`} style={{ textDecoration: 'none'}}>
            <Typography fontSize={18} color={'black'}>
              {item.title}
            </Typography>
          </Link>
          <Typography fontSize={15} sx={{ color: 'gray'}}>
            {item.category.name}
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