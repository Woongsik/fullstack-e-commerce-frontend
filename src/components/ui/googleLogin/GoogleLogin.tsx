import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { styled } from '@mui/material';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

import { MUIButtonVariant } from '../../../misc/types/MUI';
import CenteredContainer from '../layout/CenteredContainer';
import { useTheme } from '../../contextAPI/ThemeContext';
import UiButton from '../button/UiButton';
import { apiService } from '../../../services/APIService';
import { useAppDispatch } from '../../../redux/store';
import { addUser, logout } from '../../../redux/slices/UserSlice';
import { User, UserRole } from '../../../misc/types/User';

export type GoogleLoginResult = {
  name: string;
  email: string;
  picture: string;
}

const ErrorMessage = styled('h5')({
  color: 'red',
  textAlign: 'center'
});

export default function GoogleLogin() {
  const { isThemeLight } = useTheme();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState<boolean>(false);

  const url: string = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token';
  const loginWithGoolgle = useGoogleLogin({
    onSuccess: async (token: TokenResponse) => {
      try {
        const result: GoogleLoginResult = await apiService.loginWithGoogle(url, token.access_token);       
        await dispatch(logout());

        const newUser: User = {
          name: result.name,
          avatar: result.picture,
          email: result.email,
          password: '',
          id: 0,
          role: UserRole.CUSTOMER
        }

        await dispatch(addUser(newUser));
      } catch (e) {
        setShowError(true);
      }
    }
  });
   
  return (
    <CenteredContainer>
      <CenteredContainer width={'100%'}>
        <UiButton
          onClick={loginWithGoolgle} 
          variant={MUIButtonVariant.TEXT}
          customStyle={{ 
            color: isThemeLight ? 'white' : 'black',
            '&:hover': {
              fontWeight: 'bold',
              border: '1px solid black'
            } 
          }}>
          LOGIN with <GoogleIcon sx={{ marginLeft: 1 }}/>
        </UiButton>
      </CenteredContainer>
      
      <CenteredContainer>
        {showError && <ErrorMessage>Failed with Google accounts!<br /> Try again later or use the email & password!</ErrorMessage>}
      </CenteredContainer>
    </CenteredContainer>

  )
}
