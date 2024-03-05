import ProductCreateOrUpdate from '../../components/productCreateOrUpdate/ProductCreateOrUpdate';
import GridContainer from '../../components/uis/layout/GridContainer';
import { useUserSession } from '../../hooks/useUserSession';
import { MUILayout } from '../../misc/types/MUI';

export default function ProdcutUpdate() {
  useUserSession();

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <ProductCreateOrUpdate />
    </GridContainer>
  )
}

