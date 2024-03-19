import { 
  Box,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { Product } from '../../../misc/types/Product';

type Props = {
  product: Product
}

const TitleComponent = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block'
});

const ProductCardWrapper = styled(Box)({
  minWidth: 100,
  maxWidth: 300,
  minHeight: 350
});

const ProductCardLink = styled(Link)({
  textDecoration: 'none', 
  color: 'black'
});

export default function ProductCard(props: Props) {
  const { product } = props;

  return (
    <ProductCardWrapper>
      <ProductCardLink to={`/product/${product.id}`}>
        <Box>
          <Box width={300} height={300}>
            {(product.images && product.images[0]) ?
              <UiImage 
                src={product.images && product.images[0] ? product.images[0] :''}
                alt={product.title} />
            : <UiNoImage />
            }
          </Box>
          
          <Box>
            <TitleComponent>{product.title}</TitleComponent>
            <Typography color={'gray'}>{product.category.name}</Typography>
            <Typography>€ {product.price}</Typography>
          </Box>
        </Box>
      </ProductCardLink>
    </ProductCardWrapper>
  )
}
