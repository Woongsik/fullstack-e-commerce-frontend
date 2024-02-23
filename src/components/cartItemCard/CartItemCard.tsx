import React from 'react';
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CartItem from '../../misc/types/CartItem';

type Props = {
  cartItem: CartItem
}

export default function CartItemCard(props: Props) {
  const { item, quantity } = props.cartItem;
  return (
    <>
    <Divider />
    <Box component={'div'} display={'flex'} my={1}>
      <Box component={'div'}>
        <img src={item.images && item.images[0] ? item.images[0] :''}
             width={164}
             alt={item.title} />
      </Box>
      <Box component={'div'} marginLeft={2} 
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
          <Box>
            {/* if changed, dispatch the change to redux */}
            Quantity: {quantity}
          </Box>

          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button><FavoriteBorderIcon sx={{ color: 'black' }} /></Button>
            <Button><DeleteOutlineIcon sx={{ color: 'black' }} /></Button>
          </ButtonGroup>
          </Box>
      </Box>
    </Box>
    </>
  )
}
