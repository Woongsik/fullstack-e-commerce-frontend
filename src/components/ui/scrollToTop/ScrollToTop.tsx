import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from '@mui/material';

import UiButton from '../button/UiButton';
import { useTheme } from '../../contextAPI/ThemeContext';

export default function ScrollToTop() {
  const { isThemeLight } = useTheme();
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
          backgroundColor: isThemeLight ? 'white' : 'black', 
          borderRadius: '50%', 
          padding: '3px', 
          border:'2px solid black', 
          minWidth: 0,
          "&:hover": {
            backgroundColor: isThemeLight ? 'black' : 'white'
          } 
        }}
        onClick={() => handleScroll()}>
        <KeyboardArrowUpIcon 
          sx={{ 
            color: isThemeLight ? 'black' : 'white', 
            fontSize: 35,
            "&:hover": {
              color: isThemeLight ? 'white' : 'black'
            }  
          }}  />
      </UiButton>
    </Box>
  )
}
