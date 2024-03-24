import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import { MUILayout } from '../../../misc/types/MUI';
import { Theme, useTheme } from '../../contextAPI/ThemeContext';

type Props = {
  children: ReactNode,
  alignItems?: MUILayout,
  justifyContent?: MUILayout,
  sx?: Object
}

let initProps = {
  alignItems: MUILayout.CENTER,
  justifyContent: MUILayout.CENTER
}

export default function GridContainer(props: Props) {
  const { theme } = useTheme();
  const themeValues = {
    backgroundColor: theme === Theme.LIGHT ? 'black': 'white'
  }

  const { children, sx, alignItems,justifyContent } = {...initProps, ...props, ...themeValues};

  return (
    <Grid 
      container 
      justifyContent={justifyContent} alignItems={alignItems}
      minHeight={'calc(100vh - 150px)'}
      sx={{...sx, ...themeValues}}>
      {children}
    </Grid>
  )
}
