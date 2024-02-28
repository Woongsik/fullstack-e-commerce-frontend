import { 
  Box,
  Grid
} from '@mui/material';

import ProductCard from '../productCard/ProductCard';
import { Product } from '../../misc/types/Product';

type Props = {
  products: Product[];
}

export default function ProductList(props: Props) {
  const { products } = props;

  return (
    <Box component={'div'} margin={1}> 
      <Grid container spacing={2}>
        {products.map((product: Product) => 
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
        )}
      </Grid>
    </Box>
  )
}
