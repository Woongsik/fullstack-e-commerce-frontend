import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar,
  Box, 
  Divider, 
  IconButton, 
  List, 
  ListItem,
  Menu,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { useTheme } from '../ThemeContext';
import { AppState, useAppDispatch } from '../../../redux/store';
import { logout } from '../../../redux/slices/UserSlicer';

enum Pages {
  LOGIN = "login",
  PROFILE = 'profile',
  LOGOUT = 'logout'
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', padding: '0 10px'}}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'50px'}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <Box component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Box component={'img'} src={"https://fakeapi.platzi.com/_astro/logo.aa139940.png"} height={'40px'} width={'auto'}/>
              <Box component={'h3'} marginLeft={1}>Platzi store</Box> 
            </Box>
            </Link>
        </Box>
        <Divider />
        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              disablePadding>
          <ListItem>
            <Link to="/cart" title='Cart'>
              <ShoppingCartCheckoutIcon sx={{ color: 'white' }} />
            </Link>
          </ListItem>
          <ListItem>
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
      </List>
    </Box>
  </header>
  )
}