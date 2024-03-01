import { Box } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function UiNoImage() {
  return (
    <Box height={'100%'} width={'100%'} 
         display={'flex'} justifyContent={'center'} alignItems={'center'}
         sx={{ backgroundColor: 'lightgray' }}>
      <Box textAlign={'center'}>
        <ImageNotSupportedIcon sx={{ fontSize: 40, color: 'white'}}/>
        <h4 style={{color: 'white'}}>No images...</h4>
      </Box>
    </Box>
  )
}
