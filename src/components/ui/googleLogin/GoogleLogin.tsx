import { GoogleLogin as GLogin, CredentialResponse } from '@react-oauth/google';
import { useSelector } from 'react-redux';

import CenteredContainer from '../layout/CenteredContainer';
import { AppState, useAppDispatch } from '../../../redux/store';
import { loginWithGoogle, logout } from '../../../redux/slices/UserSlice';
import LoadingAndMessage from '../loadingAndMessage/LoadingAndMessage';

export default function GoogleLogin() {
  const dispatch = useAppDispatch();
  let { loading, error } = useSelector((state: AppState) => state.userReducer); 

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      if (response && response.credential) {
        await dispatch(logout()); // Remove tokens in localstorage
        await dispatch(loginWithGoogle(response.credential));
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleError = () => {
    error = 'Google login failed!'
  }
  
  return (
    <CenteredContainer>
      <CenteredContainer width={'100%'}>
        <GLogin
          onSuccess={handleSuccess}
          onError={handleError} />
      </CenteredContainer>
      
      <LoadingAndMessage 
        loading={loading}
        error={error} />
    </CenteredContainer>

  )
}
