import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Theme, useTheme } from '../ThemeContext';

const footerItem = (theme: Theme, child: ReactNode, index: number) => (
  <Link to="#" key={`footer_item_${index}`}>
    <IconButton sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }}>
      {child}
    </IconButton>
  </Link>
);

export default function Footer() {
  const { theme } = useTheme();
  const footerItems: ReactNode[] = [<InstagramIcon />, <FacebookIcon />, <TwitterIcon />];

  return (
    <footer>
      <Grid container justifyContent='center' alignItems='center' 
        height={'75px'}
        sx={{ 
          padding: '0 10px', 
          backgroundColor: theme === Theme.LIGHT ? 'white' : 'black',
          border: theme === Theme.LIGHT ? '1px solid lightgray' : '' }}>
        <Stack direction="row" spacing={2}>
          {footerItems.map((icon, index) => footerItem(theme, icon, index))}
        </Stack>  
      </Grid>
    </footer>
  )
}