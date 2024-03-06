import { Box } from '@mui/material';
import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import GridContainer from '../../components/uis/layout/GridContainer';
import { useUserSession } from '../../hooks/useUserSession';
import { MUILayout } from '../../misc/types/MUI';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';

export default function ProdcutUpdate() {
  useUserSession();

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer margin='50px 0' width={'100%'}>
        <ProductCreateOrUpdate />
      </CenteredContainer>
    </GridContainer>
  )
}

