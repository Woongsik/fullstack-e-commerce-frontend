import { Snackbar } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  show: boolean,
  message: string,
  action?: ReactNode,
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void
}

export default function UiSnackbar(props: Props) {
  const { show, message, action, onClose } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={show}
      onClose={onClose}
      message={message}
      autoHideDuration={3000}
      key={'top' + 'right'}
      sx={{ marginTop: '60px' }}
      action={action}
    />
  )
}
