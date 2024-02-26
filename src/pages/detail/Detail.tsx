import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography,Chip, Snackbar } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';

import UiButton from '../../components/ui/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { fetchProduct } from '../../redux/slices/ProductSlicer';
import { addToCart, addToFavorites } from '../../redux/slices/CartSlicer';
import { MUIButtonVariant, MUISize } from '../../misc/types/MUI';
import Product from '../../misc/types/Product';
import UiCarousel from '../../components/ui/carousel/UiCarousel';

export default function Detail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const product: Product | null = useSelector((state: AppState) => state.productReducer.product);
  
  const handleAddToCart = () => {
    if (product) {
      const result = dispatch(addToCart({
        item: product,
        quantity: 1
      }));

      console.log('result', result.payload);
      setShowSnackBar(true); 
    }
  }

  const handleAddToFavorites = () => {
    if (product) {
      dispatch(addToFavorites({
        item: product,
        quantity: 1
      }));
    }
  }

  const onSnackbarClose = () => {
    setShowSnackBar(false);
  }

  return (
    <Box component={'div'}>
      <Box component={'div'} margin={5}>
      {product ?
      
      <Box component={'div'} display={'flex'} alignItems={'flex-start'}>
        <Box maxWidth={800} width={'50%'}>
          <UiCarousel 
            images={product.images}
            alt={product.title} />
        </Box>
        <Box component={'div'} marginLeft={5} overflow={'auto'} height={'77vh'}>
          <Box component={'div'}>
            <Typography variant='h4'>
              {product.title}
            </Typography>  
            <Chip sx={{ my: 1}} label={product.category.name} color="primary" variant='outlined' size={'medium'} />
            <Typography variant='h5' >
              $ {product.price}
            </Typography>
            <Typography my={5}>
              {product.description}
            </Typography>
          </Box>

          <Box component={'div'} display={'inline-grid'} justifyContent={'center'} width={'100%'}
               position={'sticky'} bottom={0}>
            <UiButton 
              title={'Add to Cart'}
              variant={MUIButtonVariant.CONTAINED}
              size={MUISize.LARGE}
              endIcon={<ShoppingCartCheckoutIcon />}
              borderRadius={15}
              customStyle={{ my: 1, backgroundColor: 'black', color: 'white', padding: '10px 30px' }}
              onClick={handleAddToCart} />
          <UiButton 
              title={'Favorite'}
              variant={MUIButtonVariant.OUTLINED}
              size={MUISize.LARGE}
              endIcon={<FavoriteIcon />}
              borderRadius={15}
              customStyle={{ my: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', padding: '10px 30px' }}
              onClick={handleAddToFavorites} />
          </Box>
        </Box>
      </Box>
      : 
      <Box>
        Something went wrong... Please try again later...!
      </Box>
    }
    </Box>

    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={showSnackBar}
        onClose={onSnackbarClose}
        message={`Added to cart! (${product?.title})`}
        autoHideDuration={3000}
        key={'bottom' + 'right'}
      />
  </Box>
  )
}
