import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography,Chip, Snackbar, Divider, IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { InfoOutlined } from '@mui/icons-material';

import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import UiCarousel from '../../components/uis/carousel/UiCarousel';
import UiRoundButton from '../../components/uis/button/UiRoundButton';
import UiButton from '../../components/uis/button/UiButton';
import UiDialog from '../../components/uis/UiDialog';
import { AppState, useAppDispatch } from '../../redux/store';
import { deleteProduct, fetchProduct } from '../../redux/slices/ProductSlice';
import { addToCart, addToFavorites } from '../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../misc/types/MUI';
import { Product } from '../../misc/types/Product';
import { User, UserRole } from '../../misc/types/User';
import CartItem from '../../misc/types/CartItem';
import CartSliceUtil from '../../redux/utils/CartSliceUtil';
import GridContainer from '../../components/uis/layout/GridContainer';
import { useUserSession } from '../../hooks/useUserSession';
import LoadingBackdrop from '../../components/uis/loading/LoadingBackdrop';

export default function ProudctDetail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState<boolean>(false);

  useUserSession();
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const { product, loading, error }= useSelector((state: AppState) => state.productReducer);
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
    navigate("/home");
  }

  const askToDelete = () => {
    setShowDialog(true);
  }

  const handleDelete = async (proceed: boolean) => {
    setShowDialog(false);
    if (proceed && product) {
      await dispatch(deleteProduct(product));
      setShowDeletedMessage(true);
    }
  }

  const toggleEdit = () => {
    setEditMode(!editMode);
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
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <Box width={'100%'}>
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
          <CenteredContainer margin={'0 10px'} alignItems={MUILayout.FLEX_START}>
            <ProductCreateOrUpdate 
              product={product}
              onUpdate={handleUpdateDone}/> 
          </CenteredContainer>
        :
        <CenteredContainer>
          <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN} margin={'0 10px'}  width='75%'>
            <Box width={'50%'} minWidth={'300px'}>
              <UiCarousel 
                images={product.images}
                alt={product.title} />
            </Box>
            <Box component={'div'} overflow={'auto'} width={'40%'} minWidth={'300px'}>
              <Box component={'div'}>              
                <Typography variant='h4'>
                  {product.title}
                </Typography> 
                <Chip sx={{ my: 1}} label={product.category.name} color="primary" variant='outlined' size={'medium'} />
                <Typography variant='h5' >
                € {product.price}
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
          </CenteredContainer>
        </CenteredContainer>
        )
        :
        ( showDeletedMessage && 
        <CenteredContainer>
          <Typography>
            Successfully the Product is removed or product not existed!
          </Typography>
        </CenteredContainer>
        )
        }
    </Box>

    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackBar}
        onClose={onSnackbarClose}
        message={snackBarMessage}
        autoHideDuration={3000}
        key={'top' + 'right'}
        sx={{ marginTop: '60px' }}
        action={snackbarAction()}
      />

      <UiDialog 
        show={showDialog}
        title={dialogTitle(product?.title)}
        cancelTitle='Cancel'
        proceedTitle='Delete'
        proceedColor='red'
        onClose={handleDelete}/>

      <LoadingBackdrop loading={loading} />
      { error && 
      <CenteredContainer>
        <InfoOutlined sx={{ fontSize: 60 }} />
        <Typography fontWeight={'bold'} fontSize={22} width={'100%'} textAlign={'center'}>
            Something went wrong or prodcut not existed! 
        </Typography>
        <Link to={'/home'}>
            <UiButton variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} customStyle={{ margin: '15px' }}>
              Back home
            </UiButton>
          </Link>     
      </CenteredContainer>}
  </GridContainer>
  )
}

const dialogTitle = (title?: string) =>  {
  return (<span>Remove <span style={{ fontWeight: 'bold'}}>{title}</span> permanantly? You cannot make it back...</span>);
}