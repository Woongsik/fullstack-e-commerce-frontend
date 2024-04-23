import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useSelector } from 'react-redux';

import { AppState } from '../../../redux/store';
import { UserRole } from '../../../misc/types/User';
import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';

export enum Menu {
  ORDER = 'ORDERS',
  ACCOUNT = 'ACCOUNT',
  PASSWORD = 'PASSWORD',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
  USERS = 'USERS'
}

type MenuItem = {
  type: Menu;
  icon: ReactNode;
  title: string;
}

const MenuContainer = styled(Box)({
  width: '100%',
  border: '1px solid',
  borderRadius: '10px'
});

const userItems: MenuItem[] = [
  {
    type: Menu.ORDER,
    icon: <ShoppingCartIcon />,
    title: 'Orders'
  },
  {
    type: Menu.ACCOUNT,
    icon: <ManageAccountsIcon />,
    title: 'My account'
  },
  {
    type: Menu.PASSWORD,
    icon: <PasswordIcon />,
    title: 'Change Password'
  }
]

const adminItems: MenuItem[] = [
  {
    type: Menu.PRODUCTS,
    icon: <AddBoxIcon />,
    title: 'Products'
  },
  {
    type: Menu.CATEGORIES,
    icon: <CategoryIcon />,
    title: 'Categories'
  },
  {
    type: Menu.USERS,
    icon: <SupervisorAccountIcon />,
    title: 'Users'
  },
]

type Props = {
  selectedMenu: Menu;
  onMenuItem: (menu: Menu) => void;
}

export default function ProfileMenu(props: Props) {
  const { selectedMenu } = props;
  const [menu, setMenu] = useState<Menu>(selectedMenu);

  const { user } = useSelector((state: AppState) => state.userReducer);

  const handleMenuItem = (menuItem: Menu): void => {
    setMenu(menuItem)
    props.onMenuItem(menuItem);
  }

  const isSelected = (menuItem: Menu): boolean => {
    return menuItem === menu;
  }

  return (
    <MenuContainer>
      <nav aria-label="main mailbox folders">
        <List>
          {userItems.map((userItem: MenuItem) => 
            (<ListItem 
                disablePadding 
                key={userItem.type}>
              <ListItemButton 
                selected={isSelected(userItem.type)}
                onClick={() => handleMenuItem(userItem.type)}>
                <ListItemIcon>
                  {userItem.icon}
                </ListItemIcon>
                <ListItemText primary={userItem.title} />
              </ListItemButton>
            </ListItem>)
          )}
        </List>
      </nav>
      { (user && user.role === UserRole.ADMIN) && 
      <>
        <Divider />
        <h3 style={{ margin: '10px 0 0 20px' }}>Admin menu</h3>
        <nav aria-label="secondary mailbox folders">
          <List>
          {adminItems.map((adminItem: MenuItem) => 
            (<ListItem disablePadding key={adminItem.type}>
              <ListItemButton 
                selected={isSelected(adminItem.type)}
                onClick={() => handleMenuItem(adminItem.type)}>
                <ListItemIcon>
                  {adminItem.icon}
                </ListItemIcon>
                <ListItemText primary={adminItem.title} />
              </ListItemButton>
            </ListItem>)
          )}
          </List>
        </nav>
      </>
      }
    </MenuContainer>
  )
}
