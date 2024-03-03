import { Link } from 'react-router-dom';
import { Stack, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Theme, useTheme } from '../ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer>
      <Grid container justifyContent='center' alignItems='center' 
        height={'75px'}
        sx={{ 
          padding: '0 10px', 
          backgroundColor: theme === Theme.LIGHT ? 'white' : 'black',
          border: theme === Theme.LIGHT ? '1px solid lightgray' : '' }}>
        <Stack direction="row" spacing={2}>
          <IconButton>
            <Link to="#"><InstagramIcon sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }}/></Link>
          </IconButton>
          <IconButton>
          <Link to="#"><FacebookIcon sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }}/></Link>
          </IconButton>
          <IconButton>
          <Link to="#"><TwitterIcon sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }}/></Link>
          </IconButton>
        </Stack>  
      </Grid>
    </footer>
  )
}