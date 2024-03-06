import { Avatar, Box, Chip, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AppState } from '../../redux/store';
import { UserRole } from '../../misc/types/User';
import { MUIColor } from '../../misc/types/MUI';
import { Link, useLocation } from 'react-router-dom';

export default function RoleIndicator() {
  const { user } = useSelector((state: AppState) => state.userReducer);

  return (
    <Box sx={{ position: 'absolute', top: '15px', right: '30px' }}>
      { (user && user.role === UserRole.ADMIN) &&
        <Chip
          avatar={<Avatar alt={user.name} src={user.avatar} />}
          label={user.role.toUpperCase()}
          variant="outlined" />
      }
    </Box>
  )
}
