import { Box } from '@mui/material';
import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';

export default function ProdcutUpdate() {

  return (
    <CenteredContainer width={'75%'}>
      <Box>
        <ProductCreateOrUpdate />
      </Box>
    </CenteredContainer>
  )
}
