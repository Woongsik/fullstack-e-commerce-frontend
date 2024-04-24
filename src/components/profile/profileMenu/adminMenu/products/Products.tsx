import { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CenteredContainer from '../../../../ui/layout/CenteredContainer';
import AllProducts from './allProducts/AllProducts';
import AddProduct from './addProduct/AddProduct';
import { MUIButtonVariant, MUIColor } from '../../../../../misc/types/MUI';

enum TabItem {
  ALL= 0,
  NEW = 1
}

export default function Products() {
  const [tab, setTab] = useState<TabItem>(TabItem.ALL);

  const changeTab = (e: SyntheticEvent, newTab: TabItem) => {
    setTab(newTab);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <CenteredContainer sx={{ backgroundColor: 'white'}}>
        <Tabs value={tab} onChange={changeTab}>
          <Tab label="All" />
          <Tab label="New Product" />
        </Tabs>
      </CenteredContainer>
      <CenteredContainer margin='30px 0'>
        {tab === TabItem.ALL && <AllProducts />}
        {tab === TabItem.NEW &&  <AddProduct />}
      </CenteredContainer>
    </Box>
  );
}
