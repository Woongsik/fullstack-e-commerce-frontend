import { Link } from 'react-router-dom';
import { Stack, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <footer>
      <Grid container justifyContent='center' alignItems='center' sx={{ py: 2, backgroundColor: 'rgb(157 134 186)' }}>
        <Stack direction="row" spacing={2}>
          <IconButton>
            <Link to="#"><InstagramIcon /></Link>
          </IconButton>
          <IconButton>
          <Link to="#"><FacebookIcon /></Link>
          </IconButton>
          <IconButton>
          <Link to="#"><TwitterIcon /></Link>
          </IconButton>
        </Stack>  
      </Grid>
    </footer>
  )
}