import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar,
  Box, 
  Divider, 
  FormControlLabel, 
  IconButton, 
  List, 
  ListItem,
  Menu,
  MenuItem,
  Switch
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { Theme, useTheme } from '../ThemeContext';
import { AppState, useAppDispatch } from '../../../redux/store';
import { logout } from '../../../redux/slices/UserSlicer';

enum Pages {
  LOGIN = "login",
  PROFILE = 'profile',
  LOGOUT = 'logout'
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { theme, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useSelector((state: AppState) => state.userReducer);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (targetPage?: Pages) => {
    setAnchorEl(null);

    if (targetPage) {
      if (targetPage === Pages.LOGOUT) {
        dispatch(logout());
        targetPage = Pages.LOGIN; // Back to login page
      }

      navigate(`/${targetPage}`); 
    }
  };

  return (
    <header>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        backgroundColor: `${theme === Theme.LIGHT ? 'white' : 'black'}`, 
        padding: '0 10px'}}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'75px'}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <Box component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box component={'img'} src={"https://fakeapi.platzi.com/_astro/logo.aa139940.png"} height={'40px'} width={'auto'}/>
              <Box component={'h3'} marginLeft={1} 
                sx={{ color: `${theme === Theme.LIGHT ? 'black' : 'white'}` }}>
                Platzi store
              </Box> 
            </Box>
            </Link>
        </Box>
        <Divider />
        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              disablePadding>
          <ListItem disablePadding>
            <Link to="/cart" title='Cart'>
              <ShoppingCartCheckoutIcon sx={{ color: 'white' }} />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <IconButton
              id="basic-button"
              aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              onClick={handleClick}>
              {user ? 
              <Avatar src={user.avatar} alt={user.name} sx={{ height: '30px', width: '30px'}}/>
               : 
              <AccountCircleIcon sx={{ color: 'white' }} />}
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
            { user 
            ? 
            <Box>
              <MenuItem onClick={() => handleClose(Pages.PROFILE)}>
                Profile 
              </MenuItem>
              <MenuItem onClick={() => handleClose(Pages.LOGOUT)}>
                Logout 
              </MenuItem>
            </Box>
            :
            <MenuItem onClick={() => handleClose(Pages.LOGIN)}>
              Login 
            </MenuItem>
            }
          </Menu>
        </ListItem>
        <ListItem disablePadding>
          <Box display={'flex'} alignItems={'center'}>
            <Switch 
              color="primary" 
              checked={theme === Theme.LIGHT}
              onChange={() => toggleTheme()}
            />
            <Box sx={{ color: `${theme === Theme.LIGHT ? 'black' : 'white'}` }}>{theme}</Box>
          </Box>
        </ListItem>
      </List>
    </Box>
  </header>
  )
}