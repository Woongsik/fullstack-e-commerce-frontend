import { Avatar, Box, Card, Chip, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';


const UserInfoItem = styled(Box)({
  margin: '20px 0',
  width: '100%'
});

const TitleChip = styled(Chip)({
  minWidth: '100px', 
  color: 'black', 
  backgroundColor: 'white', 
  marginRight: '10px'
});

export default function Profile() {
  useUserSession();
  const { user, loading } = useSelector((state: AppState) => state.userReducer);
  
  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer width={'75%'} alignItems={MUILayout.FLEX_START} margin={'50px 0'}>
        <Box width={'100%'}>
          {user && 
          <Box width={'100%'}>
            <CenteredContainer width={'100%'}>
              <Avatar 
                alt={user.username} 
                src={user.avatar}
                sx={{ height: '120px', width: '120px'}} />              
            </CenteredContainer>

            <Card sx={{ marginTop: '-50px', display: 'flex', minWidth: '300px', justifyContent: 'center'}}>
              <CenteredContainer width={'30%'} sx={{ minWidth: '300px', margin: '50px 30px' }}>
                <CenteredContainer width={'100%'}>
                  <h1>Moi, {user.username}!</h1>
                </CenteredContainer>
                <CenteredContainer width={'100%'} justifyContent={MUILayout.FLEX_START}>
                  <UserInfoItem>
                    <TitleChip label={'Username'} variant="outlined" /> {user.username}
                  </UserInfoItem>
                  <UserInfoItem>
                    <TitleChip label={'Contact'} variant="outlined" /> {user.email}
                  </UserInfoItem>
                  <UserInfoItem>
                    <TitleChip label={'Role'} variant="outlined" /> {user.role.toUpperCase()}
                  </UserInfoItem>
                  <UserInfoItem>
                  <TitleChip label={'Avatar'} variant="outlined" /> {user.avatar}
                  </UserInfoItem>
                </CenteredContainer>
              </CenteredContainer>
            </Card>
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
