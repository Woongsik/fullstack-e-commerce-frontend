import { useState } from 'react';
import { Box, Link, Button, ButtonGroup, Dialog, DialogActions, DialogTitle, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CartItem from '../../misc/types/CartItem';
import { useAppDispatch } from '../../redux/store';
import { removeFromCart, updateQuantityInCart } from '../../redux/slices/CartSlicer';
import FormSelects from '../ui/FormSelects';
import { Link as RouterLink } from 'react-router-dom';

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
    console.log('should delete', shouldDelete);
    setShowDeleteDialog(false);
    if (shouldDelete) {
      dispatch(removeFromCart(props.cartItem));
    }
  }

  const handleQuantityChanges = (value: string) => {
    console.log('handleQuantityChanges', value);
    dispatch(updateQuantityInCart({
      ...props.cartItem,
      quantity: parseInt(value)
    }));
  }

  return (
    <>
    <Divider />
    <Box component={'div'} display={'flex'} my={1}>
      <Box component={'div'} width={164}>
        <Link href={`/product/${item.id}`} underline="none" color={'inherit'}>
          <img src={item.images && item.images[0] ? item.images[0] :''}
                width={164}
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
            $ {item.price}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Box display={'flex'} alignItems={'center'}>
            {/* if changed, dispatch the change to redux */}
            Quantity:
            <FormSelects 
              items={quantityItems}  
              displayKey={'key'} 
              valueKey={'key'} 
              size={'small'}
              selectedValue={quantity.toString()}
              onChange={handleQuantityChanges} />
          </Box>

          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button><FavoriteBorderIcon sx={{ color: 'black' }} /></Button>
            <Button onClick={handleDeleteItem}><DeleteOutlineIcon sx={{ color: 'black' }} /></Button>
          </ButtonGroup>
          </Box>
      </Box>
    </Box>
    <Dialog
        open={showDeleteDialog}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" fontSize={15}>
          Remove
          <span style={{ fontWeight: 'bold'}}> {item.title} </span> from cart?
        </DialogTitle>
        <DialogActions>
          <Button 
            size={'small'}       
            variant={"text"} 
            sx={{ fontSize: 12}}
            onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button 
            size={'small'} 
            variant="contained" 
            color="error"
            sx={{ borderRadius: 15, fontSize: 12 }} 
            onClick={() => handleClose(true)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}