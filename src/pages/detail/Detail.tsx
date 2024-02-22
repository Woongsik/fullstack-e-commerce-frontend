import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Chip } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import 'react-multi-carousel/lib/styles.css';


import { AppState, useAppDispatch } from '../../redux/store';
import { fetchProduct } from '../../redux/slices/ProductSlicer';
import Product from '../../misc/types/Product';
import Carousel from 'react-multi-carousel';
import './Detail.css';

export default function Detail() {
  const { id } = useParams(); // product id
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  const product: Product | null = useSelector((state: AppState) => state.productReducer.product);
  
  return (
    <Box component={'div'}>
      <Box component={'div'} margin={5}>
      {product ?
      
      <Box component={'div'} display={'flex'}>
        <Box maxWidth={800} width={'50%'}>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass="carousel-dot-list"
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 1
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
          {product.images.map((image: string, index: number) => 
            <img key={index}
              src={image} 
              alt={product.title}
              style={{
                display: 'block',
                height: '100%',
                margin: 'auto',
                width: '100%',
                borderRadius: 15
              }} />
          )}
        </Carousel>
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
            <Button
              disableRipple
              disableTouchRipple
              sx={{ my: 1, backgroundColor: 'black', color: 'white', borderRadius: 15, padding: '10px 30px' }}
              component="label"
              role={'button'}
              variant="contained"
              tabIndex={-1}
              size={'large'}
              endIcon={<ShoppingCartCheckoutIcon />}>
              Add to Cart
            </Button>
            <Button 
              sx={{ my: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', borderRadius: 15, padding: '10px 30px' }}
              disableRipple
              disableTouchRipple
              component="label"
              role={'button'}
              variant="outlined"
              tabIndex={-1}
              size={'large'}
              endIcon={<FavoriteIcon />}>
              Favorite
            </Button>
          </Box>
        </Box>
      </Box>
      : 
      <Box>
        Something went wrong... Please try again later...!
      </Box>
    }
    </Box>
  </Box>
  )
}
