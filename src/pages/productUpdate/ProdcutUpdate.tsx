import { Box } from '@mui/material';

import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import { useUserSession } from '../../hooks/useUserSession';

export default function ProdcutUpdate() {
  useUserSession();

  return (
    <CenteredContainer width={'75%'}>
      <Box>
        <ProductCreateOrUpdate />
      </Box>
    </CenteredContainer>
  )
}

