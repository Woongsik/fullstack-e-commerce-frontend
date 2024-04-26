import { CircularProgress, Typography, styled } from '@mui/material';

type Props = {
  loading: boolean;
  error?: string;
  message?: string;
  size?: number
}

const LoadingProgress = styled(CircularProgress)({
  position: 'absolute', 
  top: '50%'
});

const Message = styled(Typography)({
  margin: '10px'
});

const ErrorMessage = styled(Message)({
  color: 'red'
});

const SuucessMessage = styled(Message)({
  color: 'blue'
});

export default function LoadingAndMessage(props: Props) {
  const { loading, error, message, size } = props;
  return (
  <>
    { loading && <LoadingProgress size={size}/>}
    { (!loading && error) && <ErrorMessage>{error}</ErrorMessage>}
    { (!loading && message) && <SuucessMessage>{message}</SuucessMessage>}       
  </>
  )
}
