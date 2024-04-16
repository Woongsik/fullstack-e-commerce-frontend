import { FormHelperText } from '@mui/material'

type Props = {
  show: boolean;
  text: string;
  margin?: string;
}

export default function HelperText(props: Props) {
  const { show = false, text, margin } = props;
  return (
    <>
    { show && 
    <FormHelperText sx={{ color: '#d32f2f', margin: {margin} }}>{text}</FormHelperText>} 
    </>
  )
}
