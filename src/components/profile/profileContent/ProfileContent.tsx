import { Box, Divider } from '@mui/material';

import { Menu } from '../profileMenu/ProfileMenu'
import Orders from '../orders/Orders';
import Account from '../account/Account';
import Categories from '../categories/Categories';
import Password from '../password/Password';
import Products from '../products/Products';

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
      </Box>
    </Box>
  )
}
