import React, { useState } from 'react';
import { 
  Box,
  Skeleton,
  Typography
} from '@mui/material';

import Product from '../../misc/types/Product';
import { Link } from 'react-router-dom';

type Props = {
  product: Product
}

export default function ProductCard(props: Props) {
  const { product } = props;
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const handleImageError = () => {
    setImageFailed(true);
  }

  return (
    <Box component={'div'} sx={{ minWidth: 100, maxWidth: 300, minHeight: 350 }}>
      <Link to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'black'}}>
        <Box component={'div'}>
          <Box component={'div'} width={300} height={300}>
          { imageFailed ? <Skeleton animation="wave" variant="rectangular" width={'100%'} height={'100%'} />
            : 
          <img
            src={(product.images && product.images[0]) ?? ''}
            alt={product.title}
            loading="lazy"
            onError={handleImageError}
            height={'auto'}
            width={'100%'} />
          }
          </Box>
          
          <Box component={'div'}>
            <Typography>{product.title}</Typography>
            <Typography color={'gray'}>{product.category.name}</Typography>
            <Typography>${product.price}</Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
