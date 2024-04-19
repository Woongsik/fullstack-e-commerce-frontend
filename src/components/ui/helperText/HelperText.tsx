import { FormHelperText } from '@mui/material'

type Props = {
  show: boolean;
  text: string;
  margin?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export default function HelperText(props: Props) {
  const { show = false, text, margin, textAlign } = props;
  return (
    <>
    { show && 
    <FormHelperText sx={{ color: '#d32f2f', margin: {margin}, textAlign: {textAlign} }}>{text}</FormHelperText>} 
    </>
  )
}
