import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import GridContainer from '../../components/uis/layout/GridContainer';
import { useUserSession } from '../../hooks/useUserSession';
import { MUILayout } from '../../misc/types/MUI';

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

