import { Box, Divider } from '@mui/material';

import { Menu } from '../profileMenu/ProfileMenu'
import Orders from '../profileMenu/userMenu/orders/Orders';
import Account from '../profileMenu/userMenu/account/Account';
import Categories from '../profileMenu/adminMenu/categories/Categories';
import Password from '../profileMenu/userMenu/password/Password';
import Products from '../profileMenu/adminMenu/products/Products';
import Users from '../profileMenu/adminMenu/users/Users';

type Props = {
  selectedMenu: Menu
}

export default function ProfileContent(props: Props) {
  const { selectedMenu } = props;
  
  return (
    <Box>
      <h3>{selectedMenu}</h3>
      <Divider />
      <Box my={1} display={'flex'} justifyContent={'center'}>
        {selectedMenu === Menu.ORDER && <Orders />}
        {selectedMenu === Menu.ACCOUNT && <Account />}
        {selectedMenu === Menu.PASSWORD && <Password />}

        {/* Admin menu */}
        {selectedMenu === Menu.PRODUCTS && <Products />}
        {selectedMenu === Menu.CATEGORIES && <Categories />}
        {selectedMenu === Menu.USERS && <Users />}
      </Box>
    </Box>
  )
}
