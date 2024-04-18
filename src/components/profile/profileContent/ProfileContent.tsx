import React, { useState } from 'react'
import { Menu } from '../profileMenu/ProfileMenu'
import { Box, Divider } from '@mui/material';
import Orders from '../../orders/Orders';

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
      </Box>
    </Box>
  )
}
