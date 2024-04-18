import React, { useState } from 'react'
import { Menu } from '../profileMenu/ProfileMenu'
import { Box, Divider } from '@mui/material';
import Orders from '../orders/Orders';
import Account from '../account/Account';
import AddCategory from '../add_category/AddCategory';

type Props = {
  selectedMenu: Menu
}

export default function ProfileContent(props: Props) {
  const { selectedMenu } = props;
  
  
  return (
    <Box>
      <h3>{selectedMenu}</h3>
      <Divider />
      <Box my={1}>
        {selectedMenu === Menu.ORDER && <Orders />}
        {selectedMenu === Menu.ACCOUNT && <Account />}

        {selectedMenu === Menu.ADD_CATEGORY && <AddCategory />}
      </Box>
    </Box>
  )
}
