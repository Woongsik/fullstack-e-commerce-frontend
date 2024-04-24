import { useSelector } from 'react-redux';
import { Box, CircularProgress, Grid } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import ProductCard from '../productCard/ProductCard';
import { Product } from '../../../misc/types/Product';
import { AppState } from '../../../redux/store';
import CenteredContainer from '../../ui/layout/CenteredContainer';

export default function ProductList() {
  const { products, loading, error } = useSelector((state: AppState) => state.productReducer);

  return (
    <Box component={'div'} margin={1}> 
      <Grid container spacing={2} justifyContent={'center'} minHeight={'50vh'}>
        {products.map((product: Product) => 
        <Grid item key={product._id}>
          <ProductCard product={product} />
        </Grid>
        )}
        {(!loading && error) &&
          <CenteredContainer>
            <SearchOffIcon sx={{ fontSize: 35, marginRight: 1 }} />
            <h2> No items found!</h2> 
          </CenteredContainer>
        }
        { loading && 
          <CenteredContainer>
            <CircularProgress sx={{ fontSize: 35 }}/>
          </CenteredContainer>
        }
      </Grid>
    </Box>
  )
}
