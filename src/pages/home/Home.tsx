import { useState } from 'react'
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import ProductList from '../../components/product/productList/ProductList';
import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import GridContainer from '../../components/ui/layout/GridContainer';
import ScrollToTop from '../../components/ui/scrollToTop/ScrollToTop';
import { useUserSession } from '../../hooks/useUserSession';
import { MUILayout } from '../../misc/types/MUI';
import { useTheme } from '../../components/contextAPI/ThemeContext';
import FilterDrawer from '../../components/ui/filterDrawer/FilterDrawer';

export default function Home() {
  useUserSession();
  const { isThemeLight } = useTheme();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [clearFilterValues, setClearFilterValues] = useState<boolean>(false);

  const toggleDrawer = (): void => {
    setOpenDrawer(!openDrawer);
  }

  const clearFilter = (): void => {
    setClearFilterValues(!clearFilterValues);
  }

  const FilterIndicator = () => (
    <CenteredContainer height={'50px'}  width={'100%'} sx={{ position: 'sticky', top: 0, zIndex: 100}}>
      <CenteredContainer  sx={{ backgroundColor: isThemeLight ? 'white' : 'black', borderRadius: '30px' }} margin={'5px'}>
        <CenteredContainer sx={{ color: isThemeLight ? 'black' : 'white', padding: '5px 20px'}}>
          <CenteredContainer onClick={() => toggleDrawer()} sx={{ cursor: 'pointer', marginRight: 1 }}>
            <SearchIcon /> Search
          </CenteredContainer>
          <Box onClick={() => clearFilter()} sx={{ cursor: 'pointer', marginLeft: 1 }}>
            <CancelIcon sx={{ color: isThemeLight ? 'black' : 'white' }}/>
          </Box>
        </CenteredContainer>
      </CenteredContainer>
    </CenteredContainer>
  );

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <FilterIndicator />
      <CenteredContainer alignItems={MUILayout.FLEX_START} width='75%' sx={{ minWidth: '300px', overflow: 'auto', margin: '10px 0' }}>
        <ProductList />
        <PageNavigation />
      </CenteredContainer>
      <FilterDrawer 
        clear={clearFilterValues} 
        open={openDrawer} />
    <ScrollToTop />
  </GridContainer>
  )
}
