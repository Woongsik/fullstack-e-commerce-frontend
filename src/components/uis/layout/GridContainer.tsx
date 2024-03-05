import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';

type Props = {
  children: ReactNode,
  sx?: Object
}

export default function GridContainer(props: Props) {
  const { children, sx } = props;

  return (
    <Grid 
      container 
      justifyContent={'center'} alignContent={'center'}
      height={'calc(100vh - 150px)'}
      sx={sx}>
      {children}
    </Grid>
  )
}
