import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
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

const ProductImageBox = styled(Box)({
  width: 300,
  height: 300,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ProductImageBoxWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
});

const ProductDetailIndicator = styled('div')({
  position: 'absolute', 
  border: '1px solid black', 
  borderRadius: 15, 
  padding: '5px 10px', 
  backgroundColor: 'white',
  color: 'black'
});

export default function ProductCard(props: Props) {
  const { product } = props;
  const [hovered, setHovered] = useState<boolean>(false);

  const handleHover = (hover: boolean) => {
    setHovered(hover);
  }

  const hoverCss = {
    opacity: 0.7, 
    height: '130%',
    width: '130%'
  }

  return (
    <ProductCardWrapper>
      <ProductCardLink to={`/product/${product.id}`}>
        <Box>
          <ProductImageBox onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            {(product.images && product.images[0]) ?
              <ProductImageBoxWrapper sx={ hovered ? hoverCss : {}}>
                <UiImage 
                  src={product.images && product.images[0] ? product.images[0] :''}
                  alt={product.title} />
              </ProductImageBoxWrapper>
            : <UiNoImage />
            }
            
            {hovered && <ProductDetailIndicator>View more details</ProductDetailIndicator>}
          </ProductImageBox>
          
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
