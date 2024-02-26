import { Avatar, Box, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getUserWithSession } from '../../redux/slices/UserSlicer';
import UiImage from '../../components/ui/UiImage';

export default function Profile() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserWithSession());
  }, [dispatch]);

  const { loading, error, user } = useSelector((state: AppState) => state.userReducer)
    if (!user) {
      console.log('user not existed');
    // navigate to login
  }
  
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box  display={'flex'} justifyContent={'center'} width={'75%'}>
        <Box>
          <h1>Profile</h1>

          {user ? 
          <Box>
            <Avatar 
              alt={user.name} 
              src={user.avatar} />
            
            <Typography>
              Name: {user.name}
            </Typography>

            <Typography>
              Email: {user.email}
            </Typography>

            <Typography>
              Avatar URL: {user.avatar}
            </Typography>
          </Box> : 
          <Box> 
            No user to load...
          </Box>
          }

        </Box>
      </Box>
    </Box>
  )
}
