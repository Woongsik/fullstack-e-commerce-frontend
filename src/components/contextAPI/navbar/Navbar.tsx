import { Link } from 'react-router-dom';
import { 
  Box, 
  Divider, 
  List, 
  ListItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { useTheme } from '../ThemeContext';
import UiButton from '../../ui/UiButton';
import { MUIButtonVariant, MUIColor } from '../../../misc/types/MUI';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { loading, user } = useSelector((state: AppState) => state.userReducer)

  return (
    <header>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', padding: '0 10px'}}>
        <Box component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'50px'}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <Box component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box component={'img'} src={"https://fakeapi.platzi.com/_astro/logo.aa139940.png"} height={'40px'} width={'auto'}/>
              <Box component={'h3'} marginLeft={'10px'}>Platzi store</Box> 
            </Box>
            </Link>
        </Box>
        <Divider />
        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ListItem>
          {user ? 
            <Link to="/profile" title='Profile'>
              {user.name}
              <AccountCircleIcon sx={{ color: 'white' }} />
            </Link>
          :
            <Link to="/login" title="Log in">
              <UiButton 
                title="Log in"
                variant={MUIButtonVariant.CONTAINED}
                color={MUIColor.PRIMARY}
                customStyle={{ minWidth: '120px' }} />
            </Link>
          } 
          </ListItem>
          
          <ListItem>
          <Link to="/profile" title='Profile'>
              <AccountCircleIcon sx={{ color: 'white' }} />
            </Link>
          </ListItem>
          
          <ListItem>
            <Link to="/cart" title='Cart'>
              <ShoppingCartCheckoutIcon sx={{ color: 'white' }} />
            </Link>
          </ListItem>
          {/* <ListItem disablePadding>
            <Button onClick={toggleTheme} color='warning'>theme {theme}</Button>
          </ListItem> */}
        </List>
    </Box>
    </header>
  )
}
