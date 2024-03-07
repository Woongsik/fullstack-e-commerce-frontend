import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { MUILayout } from '../../../misc/types/MUI';

type Props = {
  children: ReactNode,
  alignItems?: MUILayout,
  justifyContent?: MUILayout,
  sx?: Object
}

const initProps = {
  alignItems: MUILayout.CENTER,
  justifyContent: MUILayout.CENTER,
}

export default function GridContainer(props: Props) {
  const { children, sx, alignItems,justifyContent } = {...initProps, ...props};

  return (
    <Grid 
      container 
      justifyContent={justifyContent} alignItems={alignItems}
      minHeight={'calc(100vh - 150px)'}
      sx={sx}>
      {children}
    </Grid>
  )
}
