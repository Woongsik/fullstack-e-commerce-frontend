import { useState } from 'react'

import ProductList from '../../components/product/productList/ProductList';
import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import GridContainer from '../../components/ui/layout/GridContainer';
import ScrollToTop from '../../components/ui/scrollToTop/ScrollToTop';
import { useUserSession } from '../../hooks/useUserSession';
import { MUILayout } from '../../misc/types/MUI';
import FilterDrawer from '../../components/ui/filter/filterDrawer/FilterDrawer';
import FilterIndicator from '../../components/ui/filter/filterIndicator/FilterIndicator';

export default function Home() {
  useUserSession();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [clearFilterValues, setClearFilterValues] = useState<boolean>(false);

  const toggleDrawer = (open: boolean): void => {
    setOpenDrawer(open);
  }

  const clearFilter = (): void => {
    setClearFilterValues(!clearFilterValues);
  }

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <FilterIndicator onOpen={() => toggleDrawer(true)} onClear={clearFilter}/>
      <CenteredContainer alignItems={MUILayout.FLEX_START} width='75%' sx={{ minWidth: '300px', overflow: 'auto', margin: '10px 0' }}>
        <ProductList />
        <PageNavigation />
      </CenteredContainer>
      <FilterDrawer 
        clear={clearFilterValues} 
        open={openDrawer}
        onClose={() => toggleDrawer(false)} />
    <ScrollToTop />
  </GridContainer>
  )
}
