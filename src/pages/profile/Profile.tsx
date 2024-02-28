import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppState } from '../../redux/store';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useSelector((state: AppState) => state.userReducer)
    
  if (!user) {
    console.log('user not existed');
  }
  
  return (
    <Box display={'flex'} justifyContent={'center'} minHeight={'75vh'}>
      <Box  display={'flex'} justifyContent={'center'} width={'75%'}>
        <Box>
          {user ? 
          <Box>
            <h1>Moi, {user.name}!</h1>
            
            <Avatar 
              alt={user.name} 
              src={user.avatar}
              sx={{ height: '120px', width: '120px'}} />
            
            <Typography>
              Name: {user.name}
            </Typography>

            <Typography>
              Email: {user.email}
            </Typography>

            <Typography>
              Role: {user.role.toUpperCase()}
            </Typography>

            <Typography>
              Avatar URL: {user.avatar}
            </Typography>
          </Box> : 
          <Box> 
            You need to login!
            <Link to="/login">
              Go to Log in
            </Link>
          </Box>
          }

        </Box>
      </Box>
    </Box>
  )
}
