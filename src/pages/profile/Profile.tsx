import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/uis/layout/GridContainer';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';

export default function Profile() {
  useUserSession();
  const { user, loading, error } = useSelector((state: AppState) => state.userReducer)
    
  if (!user) {
    console.log('user not existed');
  }
  
  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer width={'75%'} alignItems={MUILayout.FLEX_START}>
        <Box>
          {user && 
          <Box>
            <CenteredContainer width={'100%'}>
              <Avatar 
                alt={user.name} 
                src={user.avatar}
                sx={{ height: '120px', width: '120px'}} />
              </CenteredContainer>
           
            <CenteredContainer width={'100%'}>
              <h1>Moi, {user.name}!</h1>
            </CenteredContainer>
            
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
          </Box>
          }
          
          {loading && <Typography>Loading...</Typography>}
          {(!loading && !user) && 
          <Box> 
            You need to login!
            <Link to="/login">
              Go to Log in
            </Link>
          </Box>}
        </Box>
      </CenteredContainer>
    </GridContainer>
  )
}
