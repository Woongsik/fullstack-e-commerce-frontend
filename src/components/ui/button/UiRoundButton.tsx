import { ReactNode } from 'react'
import { MUIButtonType, MUIButtonVariant, MUISize } from '../../../misc/types/MUI';
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
        color: theme === 'black' ? 'white' : 'black',
        backgroundColor: theme === 'black' ? 'black' : 'white',
        borderColor: theme === 'black' ? '' : 'black',
        border: theme === 'black' ? '' : '1px solid',
        margin: margin,
        '&:hover': {
          backgroundColor: theme === 'black' ? 'white' : 'black',
          borderColor: theme === 'black' ? 'black' : 'black',
          color: theme === 'black' ? 'black' : 'white'
        }  
      }}
      onClick={props.onClick}>
      {children}
    </UiButton>  
  )
}
