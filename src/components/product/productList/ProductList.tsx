import { 
  Box,
  Grid
} from '@mui/material';

import ProductCard from '../productCard/ProductCard';
import { Product } from '../../../misc/types/Product';

type Props = {
  products: Product[];
}

export default function ProductList(props: Props) {
  const { products } = props;

  return (
    <Box component={'div'} margin={1}> 
      <Grid container spacing={2} justifyContent={'center'}>
        {products.map((product: Product) => 
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
        )}
        
        { products.length === 0 && <h1>No matched items...</h1>}
      </Grid>
    </Box>
  )
}
