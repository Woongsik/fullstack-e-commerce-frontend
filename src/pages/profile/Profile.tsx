import { Avatar, Box, Card, Chip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';

const titleChip = (title: string) => {
  return (<Chip label={title} variant="outlined" sx={{ minWidth: '100px', color: 'black', backgroundColor: 'white', marginRight: 1 }}></Chip>);
}
export default function Profile() {
  useUserSession();
  const { user, loading } = useSelector((state: AppState) => state.userReducer)
    
  if (!user) {
    console.log('user not existed');
  }
  
  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer width={'75%'} alignItems={MUILayout.FLEX_START} margin={'50px 0'}>
        <Box width={'100%'}>
          {user && 
          <Box width={'100%'}>
            <CenteredContainer width={'100%'}>
              <Avatar 
                alt={user.name} 
                src={user.avatar}
                sx={{ height: '120px', width: '120px'}} />              
            </CenteredContainer>

            <Card sx={{ marginTop: '-50px', display: 'flex', minWidth: '300px', justifyContent: 'center'}}>
              <CenteredContainer width={'30%'} sx={{ minWidth: '300px', margin: '50px 30px' }}>
                <CenteredContainer width={'100%'}>
                  <h1>Moi, {user.name}!</h1>
                </CenteredContainer>
                <CenteredContainer width={'100%'} justifyContent={MUILayout.FLEX_START}>
                  <Typography my={2}>
                    {titleChip('Username')} {user.name}
                  </Typography>

                  <Typography my={2}>
                    {titleChip('Contact')} {user.email}
                  </Typography>

                  <Typography my={2}>
                    {titleChip('Role')} {user.role.toUpperCase()}
                  </Typography>

                  <Typography my={2}>
                    {titleChip('Avatar')} {user.avatar}
                  </Typography>
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
