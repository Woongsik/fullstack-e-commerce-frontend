import { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CenteredContainer from '../../ui/layout/CenteredContainer';
import AllProducts from './AllProducts';
import AddProduct from './AddProduct';

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
      <CenteredContainer>
        <Tabs value={tab} onChange={changeTab}>
          <Tab label="All" />
          <Tab label="New Product" />
        </Tabs>
      </CenteredContainer>
      {tab === TabItem.ALL && <AllProducts />}
      {tab === TabItem.NEW && 
      <CenteredContainer margin='30px 0'>
        <AddProduct />
      </CenteredContainer>}
    </Box>
  );
}
