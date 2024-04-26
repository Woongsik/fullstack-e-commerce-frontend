import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import UiImage from '../../ui/image/UiImage';
import UiNoImage from '../../ui/image/UiNoImage';
import { Product } from '../../../misc/types/Product';
import { useTheme } from '../../contextAPI/ThemeContext';
import { Size } from '../../../misc/types/Size';
import { MUILayout } from '../../../misc/types/MUI';
import CenteredContainer from '../../ui/layout/CenteredContainer';
import { convertDateToString } from '../../../misc/utils/DateUtil';

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

const ProductCateogryTitleWrapper = styled(Box)({
  minWidth: '10%',
  maxWidth: '90%'
});

const SizeContainer = styled(Typography)({
  fontSize: '12px',
  border: '1px solid gray', 
  padding: '2px 5px'
});

const ProductDate = styled(Typography)({
  fontSize: '12px',
  color: 'gray'
})

export default function ProductCard(props: Props) {
  const { product } = props;
  const { isThemeLight } = useTheme();
  const [hovered, setHovered] = useState<boolean>(false);

  const productInfoTitle = (text: string) => {
    return (
      <TitleComponent sx={{ color: isThemeLight ? 'white' : 'black'}}>
        {text}
      </TitleComponent>
    )
  }

  const productInfoText = (text: string, color?: string, ellipsis: boolean = false) => {
    return (
      ellipsis ?
      <TitleComponent 
        sx={{ color: color ?? (isThemeLight ? 'white' : 'black')}}>
        {text}
      </TitleComponent>
      : 
      <Typography 
        sx={{ color: color ?? (isThemeLight ? 'white' : 'black')}}>
        {text}
      </Typography>
    )
  }

  const handleHover = (hover: boolean): void => {
    setHovered(hover);
  }

  const hoverCss = {
    opacity: 0.7, 
    height: '130%',
    width: '130%'
  }

  const convertedDate = (): string => {
    return convertDateToString(product.createdAt);
  }

  return (
    <ProductCardWrapper>
      <ProductCardLink to={`/product/${product._id}`}>
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
            {productInfoTitle(product.title)}
            <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN} width={'100%'}>
              
              <Box display={'flex'}>
                {product.sizes.map((size: Size, index: number) => 
                  <SizeContainer 
                    key={size}
                    sx={{ marginRight: (index !== product.sizes.length - 1) ? 1 : 0,
                      color: isThemeLight ? 'white' : 'black' 
                    }}>
                    {size}
                  </SizeContainer>
                )}
              </Box>
              <ProductCateogryTitleWrapper>
                {productInfoText(product.category.title, 'gray', true)}
              </ProductCateogryTitleWrapper>
            </CenteredContainer>
            <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN} width={'100%'}>
              {productInfoText(`€ ${product.price}`)}
              <ProductDate>{convertedDate()}</ProductDate>
            </CenteredContainer>
          </Box>
        </Box>
      </ProductCardLink>
    </ProductCardWrapper>
  )
}