import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, IconButton, InputAdornment, Switch, TextField, styled } from '@mui/material';
import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import UiRoundButton from '../../components/ui/button/UiRoundButton';
import UiButton from '../../components/ui/button/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { getUserWithSession, loginUser, registerUser } from '../../redux/slices/UserSlice';
import { MUIButtonType, MUIButtonVariant, MUILayout } from '../../misc/types/MUI';
import { LoggedUserInfo, RegisterUserInfo, UserRole, UserToken } from '../../misc/types/User';
import { useUserSession } from '../../hooks/useUserSession';
import { userSlicerUtil } from '../../redux/utils/UserSlicerUtil';
import GoogleLogin from '../../components/ui/googleLogin/GoogleLogin';
import { useTheme } from '../../components/contextAPI/ThemeContext';

export enum PageMode {
  LOGIN = 'login',
  SIGNIN = 'signin'
}

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  }
});

export default function Login() {
  const [pageMode, setPageMode] = useState<PageMode>(PageMode.LOGIN);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSubmittedMessage, setShowSubmittedMessage] = useState<boolean>(false);

  const { register, handleSubmit, resetField, formState: { errors } } = useForm<RegisterUserInfo>();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useSelector((state: AppState) => state.userReducer);
  const { isThemeLight } = useTheme();
  useUserSession();

  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
    }    
  };

  const onSubmit: SubmitHandler<RegisterUserInfo> = async (data: RegisterUserInfo) => {
    if (pageMode === PageMode.LOGIN) {
      await dispatch(loginUser({
        email: data.email,
        password: data.password
      }));
    } else {
      const response = await dispatch(registerUser({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        address: data.address,
        avatar: data.avatar,
        email: data.email,
        password: data.password
      }));

      if (response.payload) { 
        setShowSubmittedMessage(true);
        setPageMode(PageMode.LOGIN);
        resetField("password");
      }
    }
  }

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  }

  const togglePageMode = (): void => {
    setPageMode(pageMode === PageMode.LOGIN ? PageMode.SIGNIN : PageMode.LOGIN);
    resetField("password");     
  }

  if (user) {
    return <Navigate to="/home" />
  }

  return (
    <GridContainer sx={{ color: isThemeLight ? 'white' : 'black' }}>
      <CenteredContainer alignItems={MUILayout.FLEX_START} width={'75%'} sx={{ minWidth: '300px', maxWidth: '400px'}}>
        <FormContainer component="form"
          onSubmit={handleSubmit(onSubmit)}>
          <h1>{ pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}</h1>
          
          {pageMode === PageMode.SIGNIN &&
          <> 
            <Box>
              <TextField
                {...register("firstname", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
                error={Boolean(errors.firstname)}
                label="First name"
                helperText={errors.firstname && 'No special characters'}
                sx={textFieldCss} />
            </Box> 

            <Box>
              <TextField
                {...register("lastname", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
                error={Boolean(errors.lastname)}
                label="Last name"
                helperText={errors.lastname && 'No special characters'}
                sx={textFieldCss} />
            </Box> 
            
            <Box>
              <TextField
                {...register("username", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
                error={Boolean(errors.username)}
                label="User name"
                helperText={errors.username && 'No special characters'}
                sx={textFieldCss} />
            </Box>
          </>
          }

          <Box>
            <TextField
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }) }
              error={Boolean(errors.email)}
              label="Email"
              helperText={errors.email && 'Incorrect address!'}
              sx={textFieldCss} />
          </Box>

          <Box>
            <TextField
              {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ }) }  
              error={Boolean(errors.password)}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password && 'Minimum 8 characters, at least 1 letter & 1 number! Special characters: (@$!%*#?&) accepted'}
              sx={textFieldCss}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  sx={{ color: 'black' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              }}/>
          </Box>

          {pageMode === PageMode.SIGNIN &&
          <>
          <Box>
            <TextField
              {...register("avatar", { value: "https://picsum.photos/800", pattern: /[A-Za-z0-9]+[://]+[A-Za-z0-9-]+[\/.]/ }) }                                                          
              error={Boolean(errors.avatar)}
              label="Avatar"
              helperText={errors.avatar && 'Only valid URL accepted'}
              sx={textFieldCss} />
          </Box>

          <Box>
            <TextField
              {...register("address", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
              error={Boolean(errors.address)}
              label="Address"
              helperText={errors.avatar && 'Special characters (?.,=_@&\-) accepted'}
              sx={textFieldCss} />
          </Box>
          </>
          }
 
          <UiRoundButton
            variant={MUIButtonVariant.CONTAINED}
            theme='black'
            type={MUIButtonType.SUBMIT}
            margin={'20px 0'}>
            {pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}
          </UiRoundButton>

          <CenteredContainer justifyContent={MUILayout.FLEX_END}>
            <UiButton 
              variant={MUIButtonVariant.TEXT}
              onClick={togglePageMode}
              customStyle={{
                '&:hover': {
                  fontWeight: 'bold'
                }
              }}>
              {pageMode === PageMode.LOGIN ? 'Create new account?' : 'Need to login?'}
            </UiButton>
          </CenteredContainer>
          
          <CenteredContainer margin={'30px 0'}>
            {(!loading && (showSubmittedMessage || error)) && <InfoOutlined sx={{ color: error ? 'red' : 'blue', marginRight: 1 }}/>}
            <Box component={'span'} color={error ? 'red' : (showSubmittedMessage ? 'blue' : 'black')}>
              {loading && 'Loading...'}
              {(!loading && error) &&  `Your info is not valid! ${error}`}
              {(!loading && !error && showSubmittedMessage) && 'Successfully registered! You can login to continue!..'}
            </Box>
          </CenteredContainer>

          <GoogleLogin />
        </FormContainer>
      </CenteredContainer>
    </GridContainer> 
  )
}