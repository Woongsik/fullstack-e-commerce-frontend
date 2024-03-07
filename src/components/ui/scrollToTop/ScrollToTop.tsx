import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/material';

import UiButton from '../button/UiButton';

export default function ScrollToTop() {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  return (
    <Box sx={{ position: 'fixed', bottom: '50px', right: '15px', zIndex: 1000 }}>
      <UiButton 
        customStyle={{         
          "&:hover": {
          backgroundColor: 'white'
        }, backgroundColor: 'white', borderRadius: '50%', padding: '3px', border:'2px solid black', minWidth: 0 }}
        onClick={() => handleScroll()}>
        <KeyboardArrowUpIcon sx={{ color: 'black', fontSize: 35 }}  />
      </UiButton>
    </Box>
  )
}
