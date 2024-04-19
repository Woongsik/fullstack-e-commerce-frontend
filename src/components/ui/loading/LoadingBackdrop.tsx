import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  loading: boolean
}

export default function LoadingBackdrop(props: Props) {
  const { loading } = props;
  
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
