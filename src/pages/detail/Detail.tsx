import React, { useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';

import { AppState, useAppDispatch } from '../../redux/store';
import { fetchProduct } from '../../redux/slices/ProductSlicer';
import { useSelector } from 'react-redux';
import Product from '../../misc/types/Product';
import { Box } from '@mui/material';

export default function Detail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    } else {} // show error message
  }, [dispatch]);

  const product: Product | null = useSelector((state: AppState) => state.productReducer.product);
  console.log('product', product);

  return (
    <Box>
      {product ? <Box>
        <div>{product.title}</div>

        {product.images.map((image) => 
          <div><img src={image} height={300} /></div>
        )}

        <div>{product.description}</div>
      </Box> : 
      <Box>
      No product to load... Please try again later...
      </Box>}
    </Box>
  )
}
