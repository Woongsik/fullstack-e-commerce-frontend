import React, { ReactNode } from 'react'
import { MUIButtonType, MUIButtonVariant, MUISize } from '../../../misc/types/MUI';
import { type } from '@testing-library/user-event/dist/type';
import { size } from 'lodash';
import { title } from 'process';
import UiButton from './UiButton';

type Props = {
  variant?: MUIButtonVariant;
  type?: MUIButtonType;
  theme: 'black' | 'white';
  margin?: string;
  children: ReactNode;
  onClick?: () => void; 
}


export default function UiRoundButton(props: Props) {
  const { variant, theme, type, margin, children } = props;

  return (
    <UiButton 
      variant={variant}
      type={type}
      borderRadius={15}
      size={MUISize.LARGE}
      customStyle={{ 
        width: '100%', 
        padding: '10px 20px', 
        color: theme == 'black' ? 'white' : 'black',
        backgroundColor: theme == 'black' ? 'black' : 'white',
        borderColor: theme == 'black' ? '' : 'black',
        border: theme === 'black' ? '' : '1px solid',
        margin: margin  }}
        onClick={props.onClick}>
      {children}
    </UiButton>  
  )
}
