import React, { useState } from 'react'
import { Menu } from '../profileMenu/ProfileMenu'
import { Box, Divider } from '@mui/material';

type Props = {
  selectedMenu: Menu
}

export default function ProfileContent(props: Props) {
  const { selectedMenu } = props;
  
  
  return (
    <Box>
      <h3>{selectedMenu}</h3>
      <Divider />
      <Box>
        Content here...
      </Box>
    </Box>
  )
}
