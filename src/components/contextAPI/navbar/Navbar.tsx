import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Avatar,
  Badge,
  Box, 
  Divider, 
  IconButton, 
  List, 
  ListItem,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

import CenteredContainer from '../../ui/layout/CenteredContainer';
import UiImage from '../../ui/image/UiImage';
import { useTheme } from '../ThemeContext';
import { AppState, useAppDispatch } from '../../../redux/store';
import { logout } from '../../../redux/slices/UserSlice';
import { MUIColor, MUILayout } from '../../../misc/types/MUI';
import { Home } from '@mui/icons-material';
import { UserRole } from '../../../misc/types/User';

enum Pages {
  LOGIN = "login",
  PROFILE = 'profile',
  PRODUCT_CREATION = 'productUpdate',
  LOGOUT = 'logout'
}

type ListItemInfo = {
  to: string,
  title: string,
  item: ReactNode
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { theme, toggleTheme, isThemeLight } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useSelector((state: AppState) => state.userReducer);
  const { cartItems } = useSelector((state: AppState) => state.cartReducer);

  const listItem = (listInfo: ListItemInfo, index: number) => {
    if (listInfo.to) {
      return (<Link to={listInfo.to} title={listInfo.title} key={`nav_item_${index}`}>
        <ListItem disablePadding sx={{ marginLeft: 2, color: isThemeLight ? 'black' : 'white' }}>
          {listInfo.item}
        </ListItem>
      </Link>);
    } 
    
    return (
      <ListItem disablePadding sx={{ marginLeft: 2, color: isThemeLight ? 'black' : 'white' }} key={`nav_item_${index}`}>
        {listInfo.item}
      </ListItem>
    );
  };

  const homeItem = () => ({
    to: '/home',
    title: 'Home',
    item: (
      <Home />
    )
  });
  
  const cartItem = () => ({
    to: '/cart',
    title: 'Cart',
    item: (
      <Badge badgeContent={cartItems.length} color="primary">
        <ShoppingCartCheckoutIcon />
      </Badge>
    )
  });
  
  const userItem = () => ({
    to: '',
    title: 'User',
    item: (
      <>
        <IconButton
          id="basic-button"
          aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          onClick={handleClick}>
        {user ? 
        <Avatar src={user.avatar} alt={user.username} sx={{ height: '30px', width: '30px', backgroundColor: 'white' }}/>
        : 
        <AccountCircleIcon sx={{ color: isThemeLight ? 'black' : 'white' }} />}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        { user ? 
        <Box width={'100%'}>
          <MenuItem onClick={() => handleClose(Pages.PROFILE)}>
            <AccountBoxIcon sx={{ margin: '0 5px'}}/> Profile 
          </MenuItem>
        {user.role === UserRole.ADMIN && 
          <MenuItem onClick={() => handleClose(Pages.PRODUCT_CREATION)}>
            <AddBoxIcon sx={{ margin: '0 5px'}}/> Product
          </MenuItem>
        }
          <Divider />
          <MenuItem onClick={() => handleClose(Pages.LOGOUT)}>
            <LogoutIcon sx={{ margin: '0 5px'}}/> Logout 
          </MenuItem>
        </Box>
        :
        <MenuItem onClick={() => handleClose(Pages.LOGIN)}>
          Login 
        </MenuItem>
      }
      </Menu>
    </>
    )
  });
  
  const themeItem = () => ({
    to: '',
    title: 'Theme',
    item: (
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
    )
  });

  const listItems = [homeItem,cartItem,userItem,themeItem];

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
          backgroundColor: isThemeLight ? 'white' : 'black', 
          borderBottom: isThemeLight ? '1px solid lightgray' : '' }}>
        <CenteredContainer height={'75px'}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <CenteredContainer>
              <Box height={'40px'}>
                <UiImage src={"https://fakeapi.platzi.com/_astro/logo.aa139940.png"} alt="logo" />
              </Box>
              <Box component={'h3'} marginLeft={1} 
                sx={{ color: isThemeLight ? 'black' : 'white' }}>
                Platzi store
              </Box> 
            </CenteredContainer>
          </Link>
        </CenteredContainer>

        <List sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disablePadding>
          {listItems.map((item, index) => listItem(item(), index)) }
        </List>
      </CenteredContainer>
    </header>
  )
}