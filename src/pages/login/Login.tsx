import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import { InfoOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

import UiButton from '../../components/ui/button/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { getUserWithSession, loginUser, registerUser } from '../../redux/slices/UserSlice';
import { MUIButtonType, MUIButtonVariant, MUIColor, MUILayout, MUISize } from '../../misc/types/MUI';
import { UserRole } from '../../misc/types/User';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import UiRoundButton from '../../components/ui/button/UiRoundButton';

type Inputs = {
  name: string
  email: string,
  password: string,
  admin: boolean
}

enum PageMode {
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

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log('on Submit', data);

    if (pageMode === PageMode.LOGIN) {
      await dispatch(loginUser({
        email: data.email,
        password: data.password
      }));

      await dispatch(getUserWithSession());
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
    <GridContainer>
      <Box display={'flex'} justifyContent={'center'} width={'75%'} minWidth={'200px'}>
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
              helperText={errors.name && 'Incorrect name! No special characters'} />
          </Box> 
          }

          <Box>
            <TextField
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }) }
              error={Boolean(errors.email)}
              label="Email"
              helperText={errors.email && 'Incorrect email! Please check again!'} />
          </Box>

          <Box>
            <TextField
              {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }) }
              error={Boolean(errors.password)}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password && 'Incorrect password! Minimum eight characters, at least one letter and one number!'}
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
            />
            <Box>Register as Admin</Box>
          </Box>
          }
 
          <UiRoundButton
            variant={MUIButtonVariant.CONTAINED}
            theme='black'
            type={MUIButtonType.SUBMIT}>
            {pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}

          </UiRoundButton>

          <CenteredContainer justifyContent={MUILayout.FLEX_END} margin='15px 0'>
            <UiButton 
              variant={MUIButtonVariant.TEXT}
              onClick={togglePageMode}>
              {pageMode === PageMode.LOGIN ? 'Create new account?' : 'Need to login?'}
            </UiButton>
          </CenteredContainer>
          
          <CenteredContainer margin={'30px 0'}>
            {showSubmittedMessage || error && <InfoOutlined sx={{ color: error ? 'red' : 'blue', marginRight: 1 }}/>}
            <Box component={'span'} color={error ? 'red' : (showSubmittedMessage ? 'blue' : 'black')}>
              {loading && 'Loading...'}
              {error &&  'You info is not valid! Please login or signin again...'}
              {showSubmittedMessage && 'Successfully registered! You can login to continue!..'}
            </Box>
          </CenteredContainer>
        </Box>
      </Box>
    </GridContainer> 
  )
}