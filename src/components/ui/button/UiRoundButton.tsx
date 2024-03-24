import { ReactNode } from 'react'
import { MUIButtonType, MUIButtonVariant, MUISize } from '../../../misc/types/MUI';
import UiButton from './UiButton';
import { useTheme } from '../../contextAPI/ThemeContext';

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
  const { isThemeLight } = useTheme();

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
        backgroundColor: theme === 'black' ? (isThemeLight ? 'lightgray': 'black') : 'white',
        border: '1px solid black',
        margin: margin,
        '&:hover': {
          backgroundColor: theme === 'black' ? 'white' : (isThemeLight ? 'lightgray': 'black'),
          borderColor: theme === 'black' ? 'black' : 'white',
          color: theme === 'black' ? 'black' : 'white'
        }  
      }}
      onClick={props.onClick}>
      {children}
    </UiButton>  
  )
}
