import React from 'react';
import { 
  Box,
  Grid, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button
} from '@mui/material';

import Product from '../../misc/types/Product';
import { Link } from 'react-router-dom';

type Props = {
  product: Product
}

export default function ProductCard(props: Props) {
  const { product } = props;

  return (
    <Box component={'div'} sx={{ minWidth: 100, maxWidth: 300, minHeight: 350 }}>
      <Link to={`/product/${product.id}`}>
        <Box component={'div'}>
          <img
          src={product.images ? product.images[0] : ''}
          alt={product.title}
          loading="lazy"
          height={'auto'}
          width={'100%'} />
          <Box component={'div'}>
            <Typography>{product.title}</Typography>
            <Typography color={'gray'}>{product.category.name}</Typography>
            <Typography>${product.price}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
