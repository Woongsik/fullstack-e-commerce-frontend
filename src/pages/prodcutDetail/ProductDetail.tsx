import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography,Chip, Snackbar, Divider, IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import UiCarousel from '../../components/uis/carousel/UiCarousel';
import UiRoundButton from '../../components/uis/button/UiRoundButton';
import UiButton from '../../components/uis/button/UiButton';
import UiDialog from '../../components/uis/UiDialog';
import { AppState, useAppDispatch } from '../../redux/store';
import { deleteProduct, fetchProduct } from '../../redux/slices/ProductSlice';
import { addToCart, addToFavorites } from '../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor } from '../../misc/types/MUI';
import { Product } from '../../misc/types/Product';
import { User, UserRole } from '../../misc/types/User';
import CartItem from '../../misc/types/CartItem';
import CartSliceUtil from '../../redux/utils/CartSliceUtil';

export default function ProudctDetail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const product: Product | null = useSelector((state: AppState) => state.productReducer.product);
  const user: User | null = useSelector((state: AppState) => state.userReducer.user);
  const cartItems: CartItem[] = useSelector((state: AppState) => state.cartReducer.cartItems); 

  const handleAddToCart = async () => {
    if (product) {
      const cartItem: CartItem = {
        item: product,
        quantity: 1
      };

      let message = `Already added to Cart! (${product.title})`;
      if (!CartSliceUtil.checkIfAlreadyAdded(cartItems, cartItem)) {
        dispatch(addToCart(cartItem));
        message = `Added to Cart! (${product.title})`;
      } 

      setSnackBarMessage(message);
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

  const onSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar(false);
  };

  const handleBack = () => {
    navigate(-1);
  }

  const askToDelete = () => {
    setShowDialog(true);
  }

  const handleDelete = async (proceed: boolean) => {
    setShowDialog(false);
    if (proceed && product) {
      await dispatch(deleteProduct(product));
    }
  }

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  const onCategoryChanged = (categoryId: number) => {
    console.log('category chagned');
  }

  const handleUpdateDone = () => {
    setEditMode(false);
  }

  const navigateToCart = () => {
    navigate('/cart');
  }

  const snackbarAction = () => {
    return (
      <UiButton 
        variant={MUIButtonVariant.CONTAINED}
        onClick={() => navigateToCart()}>
        Cart <ShoppingCartCheckoutIcon sx={{ marginLeft: 1}}/>
      </UiButton>
    )
  }

  return (
    <Box component={'div'}>
      <Box component={'div'} sx={{ my: 1 }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          <IconButton onClick={() => handleBack()}>
            <ArrowCircleLeftIcon sx={{ fontSize: 40, color: 'black' }} />
          </IconButton>

          {(user && user.role === UserRole.ADMIN) && product &&
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} margin={'0 10px'}>
            <UiButton
              variant={MUIButtonVariant.OUTLINED}
              color={MUIColor.ERROR}
              customStyle={{ margin: '0 10px' }}
              onClick={() => askToDelete()}>
              Delete 
            </UiButton>

            <UiButton
              variant={MUIButtonVariant.CONTAINED}
              color={MUIColor.INFO}
              onClick={() => toggleEdit()}>
              {editMode ? 'Cancel Edit' : 'Edit'}
            </UiButton>
          </Box>
          }
        </Box>

        <Divider sx={{ my: 1 }} />
        
      {product ?
        (editMode ? 
          <CenteredContainer margin={'0 10px'}>
            <ProductCreateOrUpdate 
              product={product}
              onUpdate={handleUpdateDone}/> 
          </CenteredContainer>
        :
        <Box component={'div'} display={'flex'} alignItems={'flex-start'} margin={'0 10px'}>
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
              <UiRoundButton
                variant={MUIButtonVariant.CONTAINED}
                theme='black'
                margin='10px 0'
                onClick={() => handleAddToCart()}>
                Add to Cart <ShoppingCartCheckoutIcon sx={{ marginLeft: 1}} />
              </UiRoundButton>
              <UiRoundButton
                variant={MUIButtonVariant.OUTLINED}
                theme='white'
                margin='10px 0'
                onClick={() => handleAddToFavorites()}>
                Favorite <FavoriteIcon sx={{ marginLeft: 1}}/>
              </UiRoundButton>
            </Box>
          </Box>
        </Box>
        )
        : 
        <Box display={'flex'} justifyContent={'center'}>
          <Typography>
            Product not existed to show!
          </Typography>
        </Box>
        }
    </Box>

    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={showSnackBar}
        onClose={onSnackbarClose}
        message={snackBarMessage}
        autoHideDuration={3000}
        key={'bottom' + 'right'}
        action={snackbarAction()}
      />

      <UiDialog 
        show={showDialog}
        title={dialogTitle(product?.title)}
        cancelTitle='Cancel'
        proceedTitle='Delete'
        proceedColor='red'
        onClose={handleDelete}/>
  </Box>
  )
}

const dialogTitle = (title?: string) =>  {
  return (<span>Remove <span style={{ fontWeight: 'bold'}}>{title}</span> permanantly? You cannot make it back...</span>);
}