import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider, IconButton, Breadcrumbs, Link as MUILink, styled, Chip, FormHelperText } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { InfoOutlined } from '@mui/icons-material';

import ProductCreateOrUpdate from '../../components/product/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import UiCarousel from '../../components/ui/carousel/UiCarousel';
import UiRoundButton from '../../components/ui/button/UiRoundButton';
import UiButton from '../../components/ui/button/UiButton';
import UiDialog from '../../components/ui/dialog/UiDialog';
import LoadingBackdrop from '../../components/ui/loading/LoadingBackdrop';
import GridContainer from '../../components/ui/layout/GridContainer';
import { AppState, useAppDispatch } from '../../redux/store';
import { deleteProduct, fetchProduct, updateFilter } from '../../redux/slices/ProductSlice';
import { addToCart, addToFavorites } from '../../redux/slices/CartSlice';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../misc/types/MUI';
import { User, UserRole } from '../../misc/types/User';
import { CartItem, CartItemBase } from '../../misc/types/CartItem';
import CartSliceUtil from '../../redux/utils/CartSliceUtil';
import { useUserSession } from '../../hooks/useUserSession';
import { Filter } from '../../misc/types/Filter';
import { useTheme } from '../../components/contextAPI/ThemeContext';
import UiSnackbar from '../../components/ui/snackbar/UiSnackbar';
import { Size, SizeLabel } from '../../misc/types/Size';
import SizeButtons from '../../components/ui/button/SizeButtons/SizeButtons';
import HelperText from '../../components/ui/helperText/HelperText';

const UiButtonGroup = styled(Box)({
  display: 'inline-grid',
  justifyContent: 'center',
  width: '100%',
  position: 'sticky', 
  bottom: 0
});

const InfoText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 22,
  width: '100%',
  textAlign: 'center'
});

const ImageContainer = styled(Box)({
  width: '50%',
  minWidth: '300px'
});

const BreadcrumbsContainer = styled(Box)({
  overflow: 'auto',
  width: '40%',
  minWidth: '300px'
});

export default function ProudctDetail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState<boolean>(false);
  const { isThemeLight } = useTheme();

  useUserSession();
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const { product, filter, loading, error }= useSelector((state: AppState) => state.productReducer);
  const user: User | null = useSelector((state: AppState) => state.userReducer.user);
  const { cartItems, cartFavorites } = useSelector((state: AppState) => state.cartReducer); 
  const [size, setSize] = useState<Size | undefined>(undefined);
  const [showSizeError, setShowSizeError] = useState<boolean>(false);

  const DetailInfoText = styled(Typography)({
    color: isThemeLight ? 'white': 'black'
  });

  const showSnakcBarMessage = (message: string) => {
    setSnackBarMessage(message);
    setShowSnackBar(true);
  }

  const handleAddToCart = async () => {
    if (!size) {
      return setShowSizeError(true);
    }

    if (product && size) {
      const cartItem: CartItem = {
        item: product,
        size: size,
        quantity: 1
      };

      let message = `Already added to Cart! (${product.title})`;
      if (!CartSliceUtil.checkIfAlreadyAdded(cartItems, cartItem)) {
        dispatch(addToCart(cartItem));
        message = `Added to Cart! (${product.title})`;
      } 

      showSnakcBarMessage(message);
    }
  }

  const handleAddToFavorites = () => {
    if (product) {
      const favoriteItem: CartItemBase = {
        item: product,
        quantity: 1
      };

      let message = `Already added to Favorites! (${product.title})`;
      if (!CartSliceUtil.checkIfAlreadyAddedInFavorite(cartFavorites, favoriteItem)) {
        dispatch(addToFavorites(favoriteItem));
        message = `Added to Favorites! (${product.title})`;
      } 

      showSnakcBarMessage(message);
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

  const handleCategoryClick = (categoryId: string) => {
    const newFilter: Partial<Filter> = {
      categoryId: categoryId,
      page: 1,
      itemsPerPage: filter?.itemsPerPage    
    }

    dispatch(updateFilter(newFilter));
    navigate('/');
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

  const dialogTitle = (title?: string) =>  {
    return (<span>Remove <span style={{ fontWeight: 'bold'}}>{title}</span> permanantly? You cannot make it back...</span>);
  }

  const handleSizeChanges = (sizes: Size[]) => {
    if (sizes && sizes.length > 0) {
      setSize(sizes[0]);
      setShowSizeError(false);
    } 
  }

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <Box width={'100%'}>
        <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN} width={'100%'}>
          <IconButton onClick={() => handleBack()}>
            <ArrowCircleLeftIcon sx={{ fontSize: 40, color: isThemeLight ? 'white' : 'black' }} />
          </IconButton>

          {(user && user.role === UserRole.ADMIN) && product &&
          <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN} margin={'0 10px'}>
            <UiButton
              variant={isThemeLight ? MUIButtonVariant.CONTAINED : MUIButtonVariant.OUTLINED}
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
          </CenteredContainer>
          }
        </CenteredContainer>

        <Divider sx={{ my: 1 }} />
        
      {product &&
        (editMode ? 
          <CenteredContainer margin={'0 10px'} alignItems={MUILayout.FLEX_START}>
            <ProductCreateOrUpdate 
              product={product}
              onUpdate={handleUpdateDone}/> 
          </CenteredContainer>
        :
        <CenteredContainer>
          <CenteredContainer alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN} margin={'0 10px'}  width='75%'>
            <ImageContainer>
              <UiCarousel 
                images={product.images}
                alt={product.title} />
            </ImageContainer>
            <BreadcrumbsContainer>
              <Box width='100%' margin='0 0 15px 0'>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: isThemeLight ? 'white' : 'black' }}>
                  <MUILink underline="hover" color="inherit" href="/">
                    Product
                  </MUILink>
                  <MUILink
                    underline="hover"
                    color="inherit"
                    href="#"
                    onClick={() => handleCategoryClick(product.category._id)}>
                    {product.category.title}
                  </MUILink>
                  <Typography color="text.primary" sx={{ color: 'inherit'}}>{product.title}</Typography>
                </Breadcrumbs>
              </Box>

              <Box>              
                <DetailInfoText variant='h4'>
                  {product.title}
                </DetailInfoText>

                <Box my={2}>
                  <SizeButtons 
                    items={product.sizes.map((size: Size) => SizeLabel[size])}
                    selectedValues={[]}
                    multiple={false}
                    justifyContent={MUILayout.FLEX_START}
                    onChange={handleSizeChanges}/>

                  <HelperText show={showSizeError} text={'Select one of sizes'} />
                </Box>
                
                <DetailInfoText variant='h5' my={2}>
                  € {product.price}
                </DetailInfoText>
                
                <DetailInfoText my={5}>
                  {product.description}
                </DetailInfoText>
              </Box>

              <UiButtonGroup>
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
              </UiButtonGroup>
            </BreadcrumbsContainer>
          </CenteredContainer>
        </CenteredContainer>
        )}
    </Box>

    <UiSnackbar 
      show={showSnackBar}
      onClose={onSnackbarClose}
      message={snackBarMessage}
      action={snackbarAction()}
    />

    <UiDialog 
      show={showDialog}
      title={dialogTitle(product?.title)}
      cancelTitle='Cancel'
      proceedTitle='Delete'
      proceedColor={MUIColor.ERROR}
      onClose={handleDelete}/>

    <LoadingBackdrop loading={loading} />
    { (error || showDeletedMessage) && 
    <CenteredContainer margin={'-150px 0 0 0'}>
      <InfoOutlined sx={{ fontSize: 60 }} />
      <InfoText>
          {showDeletedMessage ? 'Successfully Product removed!' : 'Something went wrong or prodcut not existed!'}
      </InfoText>
      <Link to={'/home'}>
          <UiButton variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} customStyle={{ margin: '15px' }}>
            Back home
          </UiButton>
        </Link>     
    </CenteredContainer>}
  </GridContainer>
  )
}