import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import UiRoundButton from '../../components/ui/button/UiRoundButton';
import UiButton from '../../components/ui/button/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { getUserWithSession, loginUser, registerUser } from '../../redux/slices/UserSlice';
import { MUIButtonType, MUIButtonVariant, MUILayout } from '../../misc/types/MUI';
import { UserRole, UserToken } from '../../misc/types/User';
import { useUserSession } from '../../hooks/useUserSession';
import { userSlicerUtil } from '../../redux/utils/UserSlicerUtil';
import GoogleLogin from '../../components/ui/googleLogin/GoogleLogin';
import { useTheme } from '../../components/contextAPI/ThemeContext';

type Inputs = {
  name: string
  email: string,
  password: string,
  admin: boolean
}

export enum PageMode {
  LOGIN = 'login',
  SIGNIN = 'signin'
}

export default function Login() {
  const [pageMode, setPageMode] = useState<PageMode>(PageMode.LOGIN);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSubmittedMessage, setShowSubmittedMessage] = useState<boolean>(false);

  const { register, handleSubmit, resetField, formState: { errors } } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useSelector((state: AppState) => state.userReducer);
  const { isThemeLight } = useTheme();
  useUserSession();

  // If use styled(), TextField trigger out of focus
  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : 'black',
      borderColor: isThemeLight ? 'white' : 'black'
    }    
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (pageMode === PageMode.LOGIN) {
      await dispatch(loginUser({
        email: data.email,
        password: data.password
      }));

      const tokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
      if (tokens) {
        await dispatch(getUserWithSession(tokens));
      }
    } else {
      await dispatch(registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "https://picsum.photos/800",
        role: data.admin ? UserRole.ADMIN : UserRole.CUSTOMER
      }));

      setShowSubmittedMessage(true);
      setPageMode(PageMode.LOGIN);
      resetField("password");    
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
        <Box
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '100%', minWidth: '300px' }}}
          onSubmit={handleSubmit(onSubmit)}>
          <h1>{ pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}</h1>
          
          {pageMode === PageMode.SIGNIN &&
          <Box>
            <TextField
              {...register("name", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
              error={Boolean(errors.name)}
              label="Name"
              helperText={errors.name && 'No special characters'}
              sx={textFieldCss} />
          </Box> 
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
              {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }) }
              error={Boolean(errors.password)}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password && 'Minimum 8 characters, at least 1 letter & 1 number!'}
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

          { pageMode === PageMode.SIGNIN && 
          <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
            <Switch 
              {...register("admin", { required: false }) }
              color="primary" 
              sx={{
                '&.MuiSwitch-root > .MuiSwitch-track': {
                  backgroundColor: isThemeLight ? 'white': 'black'
              }}}/>
            <Box>I am Admin!</Box>
          </Box>
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
              {(!loading && error) &&  'Your info is not valid! Please login or signin again...'}
              {(!loading && !error && showSubmittedMessage) && 'Successfully registered! You can login to continue!..'}
            </Box>
          </CenteredContainer>

          <GoogleLogin />
        </Box>
      </CenteredContainer>
    </GridContainer> 
  )
}