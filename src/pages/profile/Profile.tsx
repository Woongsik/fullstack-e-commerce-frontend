import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, styled } from '@mui/material';

import { AppState } from '../../redux/store';
import { useUserSession } from '../../hooks/useUserSession';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';
import ProfileMenu, { Menu } from '../../components/profile/profileMenu/ProfileMenu';
import ProfileContent from '../../components/profile/profileContent/ProfileContent';

const BoxFullWidth = styled(Box)({
  width: '100%'
});

const BoxItem = styled(Box)({
  minWidth: '300px'
});

const MenuContainer = styled(BoxItem)({
  width: '30%',
  minWidth: '200px'
});

const ContentContainer = styled(BoxItem)({
  width: '65%'
});

export default function Profile() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.ORDER);

  useUserSession();
  const { user } = useSelector((state: AppState) => state.userReducer);
  
  const handleMenuItem = (menu: Menu) => {
    setSelectedMenu(menu);
  }

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer width={'75%'} alignItems={MUILayout.FLEX_START} margin={'50px 0'}>
        <BoxFullWidth>
          {user && 
          <BoxFullWidth>
            <CenteredContainer width={'100%'}>
              <Avatar 
                alt={user.username} 
                src={user.avatar}
                sx={{ height: '120px', width: '120px'}} />              
            </CenteredContainer>

            <BoxFullWidth>
              <h3 style={{ textAlign: 'center'}}>Moi, {user.username}!</h3>
            </BoxFullWidth>

            <CenteredContainer width={'100%'} alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN}>
              <MenuContainer>
                <ProfileMenu 
                  selectedMenu={selectedMenu} 
                  onMenuItem={handleMenuItem} />
              </MenuContainer>
              <ContentContainer>
                <ProfileContent selectedMenu={selectedMenu} />
              </ContentContainer>
            </CenteredContainer>
          </BoxFullWidth>
          }
          
        {!user && 
          <CenteredContainer> 
            You need to login!
            <Link to="/login">
              Go to Log in
            </Link>
          </CenteredContainer>
        }

        </BoxFullWidth>
      </CenteredContainer>
    </GridContainer>
  )
}
