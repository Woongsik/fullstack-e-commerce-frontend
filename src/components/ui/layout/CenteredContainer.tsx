import { Box } from '@mui/material'
import { MUILayout } from '../../../misc/types/MUI';
import { ReactNode } from 'react';

type Props = {
  height?: string;
  width?: string;
  justifyContent?: MUILayout;
  alignItems?: MUILayout;
  margin?: string;
  padding?: string;
  sx?: Object;
  children?: ReactNode;
  onClick?: () => void
}

const defaultProps: Props = {
  justifyContent: MUILayout.CENTER,
  alignItems: MUILayout.CENTER
}

export default function CenteredContainer(props: Props) {
  const propsWithDefault: Props = {...defaultProps, ...props};
  const { height, width, justifyContent, alignItems, margin, padding, children, sx } = propsWithDefault;

  return (
    <Box 
      height={height} width={width}
      display={'flex'} justifyContent={justifyContent} alignItems={alignItems} 
      margin={margin} padding={padding}
      flexWrap={'wrap'}
      sx={sx}
      onClick={props.onClick}>
      {children}
    </Box>
  )
}
