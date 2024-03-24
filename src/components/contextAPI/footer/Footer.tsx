import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isThemeLight } = useTheme();
  const footerItems: ReactNode[] = [<InstagramIcon />, <FacebookIcon />, <TwitterIcon />];
  const footerItem = (child: ReactNode, index: number) => (
    <Link to="#" key={`footer_item_${index}`}>
      <IconButton sx={{ color: isThemeLight ? 'black' : 'white' }}>
        {child}
      </IconButton>
    </Link>
  );
  
  return (
    <footer>
      <Grid container justifyContent='center' alignItems='center' 
        height={'75px'}
        sx={{ 
          padding: '0 10px', 
          backgroundColor: isThemeLight ? 'white' : 'black',
          border: isThemeLight ? '1px solid lightgray' : '' }}>
        <Stack direction="row" spacing={2}>
          {footerItems.map((icon, index) => footerItem(icon, index))}
        </Stack>  
      </Grid>
    </footer>
  )
}