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
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSelector } from 'react-redux';

import { AppState } from '../../../redux/store';
import { UserRole } from '../../../misc/types/User';
import { ReactNode, useState } from 'react';

export enum Menu {
  ORDER = 'ORDER',
  ACCOUNT = 'ACCOUNT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_CATEGORY = 'ADD_CATEGORY'
}

type MenuItem = {
  type: Menu;
  icon: ReactNode;
  title: string;
}

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
  }
]

const adminItems: MenuItem[] = [
  {
    type: Menu.ADD_PRODUCT,
    icon: <AddBoxIcon />,
    title: 'Add Product'
  },
  {
    type: Menu.ADD_CATEGORY,
    icon: <AddBoxIcon />,
    title: 'Add Category'
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
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
    </Box>
  )
}
