import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, IconButton, InputAdornment, Switch, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import UiButton from '../../components/ui/button/UiButton';
import { AppState, useAppDispatch } from '../../redux/store';
import { getUserWithSession, loginUser, registerUser } from '../../redux/slices/UserSlice';
import { MUIButtonType, MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI';
import { UserRole } from '../../misc/types/User';
import GridContainer from '../../components/ui/layout/GridContainer';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';

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
  const [userPassword, setUserPassword] = useState<string>('');
  const [showSubmittedMessage, setShowSubmittedMessage] = useState<boolean>(false);

  const { register, handleSubmit, resetField, formState: { errors }, watch } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useSelector((state: AppState) => state.userReducer);

  const watchAll = watch();
  console.log('watch', watchAll);

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
          sx={{'& .MuiTextField-root': { m: 1, maxWidth: '45ch', minWidth: '200px' } }}
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

          <UiButton 
            title={pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}
            variant={MUIButtonVariant.CONTAINED}
            color={MUIColor.PRIMARY} 
            type={MUIButtonType.SUBMIT}
            borderRadius={15}
            size={MUISize.LARGE}
            customStyle={{ width: '100%', marginTop: 5, marginBottom: 1, padding: '10px 20px', backgroundColor: 'black', color: 'white' }} />

          <Box display={'flex'} justifyContent={'flex-end'}>
            <UiButton 
              title={pageMode === PageMode.LOGIN ? 'Create new account?' : 'Need to login?'}
              variant={MUIButtonVariant.TEXT}
              onClick={togglePageMode} />
          </Box>
          
          <CenteredContainer margin='3'>
            <Box></Box>

              {loading && <Box>Loading...</Box>}
              {error && <Box>Error: {error}</Box>}
              {showSubmittedMessage && <Box>Successfully registered! You can login to continue!..</Box>}
          </CenteredContainer>
        </Box>
      </Box>
    </GridContainer> 
  )
}