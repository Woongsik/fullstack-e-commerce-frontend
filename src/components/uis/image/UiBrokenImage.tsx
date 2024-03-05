import React from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Box } from '@mui/material';

export default function UiBrokenImage() {
  return (
    <Box height={'100%'} width={'100%'} 
         display={'flex'} justifyContent={'center'} alignItems={'center'}
         sx={{ backgroundColor: 'lightgray' }}>
      <Box textAlign={'center'}>
        <BrokenImageIcon sx={{ fontSize: 40, color: 'white'}}/>
        <h4 style={{color: 'white'}}>Image broken...</h4>
      </Box>
    </Box>  
  )
}
