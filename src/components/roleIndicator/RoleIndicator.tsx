import { Avatar, Box, Chip, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AppState } from '../../redux/store';
import { UserRole } from '../../misc/types/User';
import { MUIColor } from '../../misc/types/MUI';
import { Link, useLocation } from 'react-router-dom';

export default function RoleIndicator() {
  const { user } = useSelector((state: AppState) => state.userReducer);
  const location = useLocation();

  const createNewProductUrl:string = "/productUpdate";
  const showCreateIcon: boolean = !(location.pathname.includes(createNewProductUrl));
  
  return (
    <Box display={'flex'} justifyContent={'flex-end'} sx={{ position: 'sticky', top: 0 }}>
      { (user && user.role === UserRole.ADMIN) &&
      <Box display={'flex'} alignItems={'center'} sx={{ margin: '10px 10px' }}>
        {showCreateIcon && <Link to="/productUpdate">
          <IconButton 
            color={MUIColor.PRIMARY}
            title='Create new product'>
            <AddCircleIcon sx={{ fontSize: '35px' }} />
          </IconButton> 
        </Link>}
        <Chip
          avatar={<Avatar alt={user.name} src={user.avatar} />}
          label={user.role.toUpperCase()}
          variant="outlined"
          sx={{ marginLeft: '5px' }} />
      </Box>       
      }
    </Box>
    
  )
}
