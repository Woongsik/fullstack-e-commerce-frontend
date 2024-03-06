import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar,
  Badge,
  Box, 
  IconButton, 
  List, 
  ListItem,
  Menu,
  MenuItem,
  Switch,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Brightness6Icon from '@mui/icons-material/Brightness6';

import CenteredContainer from '../../uis/layout/CenteredContainer';
import UiImage from '../../uis/image/UiImage';
import { Theme, useTheme } from '../ThemeContext';
import { AppState, useAppDispatch } from '../../../redux/store';
import { logout } from '../../../redux/slices/UserSlice';
import { MUIColor, MUILayout } from '../../../misc/types/MUI';

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
  const { cartItems } = useSelector((state: AppState) => state.cartReducer);

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
      <CenteredContainer 
        justifyContent={MUILayout.SPACE_BETWEEN}
        padding={'0 10px'}
        sx={{ 
          backgroundColor: theme === Theme.LIGHT ? 'white' : 'black', 
          borderBottom: theme === Theme.LIGHT ? '1px solid lightgray' : '' }}>
        <CenteredContainer height={'75px'}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <CenteredContainer>
              <Box height={'40px'}>
                <UiImage src={"https://fakeapi.platzi.com/_astro/logo.aa139940.png"} alt="logo" />
              </Box>
              <Box component={'h3'} marginLeft={1} 
                sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }}>
                Platzi store
              </Box> 
            </CenteredContainer>
          </Link>
        </CenteredContainer>

        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disablePadding>
          <ListItem disablePadding sx={{ marginLeft: 1 }}>
            <Link to="/cart" title='Cart'>
              <Badge badgeContent={cartItems.length} color="primary">
                <ShoppingCartCheckoutIcon sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }} />
              </Badge>
              
            </Link>
          </ListItem>
          <ListItem disablePadding sx={{ marginLeft: 1 }}>
            <IconButton
              id="basic-button"
              aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              onClick={handleClick}>
              {user ? 
              <Avatar src={user.avatar} alt={user.name} sx={{ height: '30px', width: '30px'}}/>
               : 
              <AccountCircleIcon sx={{ color: theme === Theme.LIGHT ? 'black' : 'white' }} />}
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

        <ListItem color='black'>
          <ToggleButtonGroup
            color={MUIColor.SUCCESS}
            value={theme}
            exclusive
            onChange={() => toggleTheme()}
            aria-label="Theme">
            <ToggleButton value="dark">
              <Brightness6Icon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItem>
      </List>
    </CenteredContainer>
  </header>
  )
}