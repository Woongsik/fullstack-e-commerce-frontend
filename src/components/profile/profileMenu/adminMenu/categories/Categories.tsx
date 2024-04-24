import React, { SyntheticEvent, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AddCategory from './addCategory/AddCategory';
import CenteredContainer from '../../../../ui/layout/CenteredContainer';
import AllCategories from './allCategories/AllCategories';

enum TabItem {
  ALL= 0,
  NEW = 1
}

export default function Category() {
  const [tab, setTab] = useState<TabItem>(TabItem.ALL);

  const changeTab = (e: SyntheticEvent, newTab: TabItem) => {
    setTab(newTab);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <CenteredContainer sx={{ backgroundColor: 'white'}}>
        <Tabs value={tab} onChange={changeTab} aria-label="basic tabs example">
          <Tab label="All" />
          <Tab label="New Category" />
        </Tabs>
      </CenteredContainer>
      <CenteredContainer margin='30px 0'>
      {tab === TabItem.ALL && <AllCategories />}
      {tab === TabItem.NEW && <AddCategory />}
      </CenteredContainer>
    </Box>
  );
}
