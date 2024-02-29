import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { AppState, useAppDispatch } from '../../redux/store';
import { fetchProduct } from '../../redux/slices/ProductSlicer';
import { Box } from '@mui/material';
import ProductEdit from '../../components/productEdit/ProductEdit';
import ProductCreate from '../../components/productCreate/ProductCreate';

export default function ProdcutUpdate() {
  const dispatch = useAppDispatch();
  const { id } = useParams(); // product id
  if (id) {
    // fetch product detail
  } else {
    // create new product
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch]);

  // const { loading, error, product } = useSelector((state: AppState) => state.productReducer);

  return (
    <Box display={'flex'} justifyContent={'center'} width={'75%'}>
      <Box>
        {/* { loading && <h1>Loading...</h1>}

        { error && <h1>{error}</h1>}

        { product ?  <ProductEdit product={product}/>: <ProductCreate />} */}

        <ProductCreate />
      </Box>
    </Box>
  )
}
