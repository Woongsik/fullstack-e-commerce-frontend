import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography,Chip, Snackbar, Divider, IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import UiButton from '../../components/ui/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { deleteProduct, fetchProduct } from '../../redux/slices/ProductSlice';
import { addToCart, addToFavorites } from '../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI';
import { Product } from '../../misc/types/Product';
import UiCarousel from '../../components/ui/carousel/UiCarousel';
import { User, UserRole } from '../../misc/types/User';
import UiDialog from '../../components/ui/UiDialog';
import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';

export default function ProudctDetail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const product: Product | null = useSelector((state: AppState) => state.productReducer.product);
  const user: User | null = useSelector((state: AppState) => state.userReducer.user);
  
  const handleAddToCart = async () => {
    if (product) {
      dispatch(addToCart({
        item: product,
        quantity: 1
      }));

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
              title={'Delete'}
              variant={MUIButtonVariant.OUTLINED}
              color={MUIColor.ERROR}
              customStyle={{ margin: '0 10px' }}
              onClick={() => askToDelete()} />

            <UiButton
              title={editMode ? 'Cancel Edit' : 'Edit'}
              variant={MUIButtonVariant.CONTAINED}
              color={MUIColor.INFO}
              onClick={() => toggleEdit()} />
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
        message={`Added to cart! (${product?.title})`}
        autoHideDuration={3000}
        key={'bottom' + 'right'}
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

export const dialogTitle = (title?: string) =>  {
  return (<span>Remove <span style={{ fontWeight: 'bold'}}>{title}</span> permanantly? You cannot make it back...</span>);
}