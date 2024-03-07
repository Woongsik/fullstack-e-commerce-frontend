import { Box, Typography } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CenteredContainer from '../layout/CenteredContainer';

export default function UiNoImage() {
  return (
    <CenteredContainer 
        height={'100%'} width={'100%'} 
        sx={{ backgroundColor: 'lightgray' }}>
      <Box textAlign={'center'}>
        <ImageNotSupportedIcon sx={{ fontSize: 40, color: 'white'}}/>
        <Typography variant='h6' padding={0} style={{ color: 'white'}}>
          No images...
        </Typography>        
      </Box>
    </CenteredContainer>
  )
}
