import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

import UiButton from '../../components/ui/UiButton';
import { MUIButtonType, MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI';
import { AppState, useAppDispatch } from '../../redux/store';
import { loginUser, registerUser } from '../../redux/slices/UserSlicer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';

type Inputs = {
  name: string
  email: string,
  password: string
}

enum PageMode {
  LOGIN = 'login',
  SIGNIN = 'signin'
}

export default function Login() {
  const [submit, setSubmit] = useState<boolean>(false);
  const [pageMode, setPageMode] = useState<PageMode>(PageMode.LOGIN);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: AppState) => state.userReducer);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log('on Submit', data);

    if (pageMode === PageMode.LOGIN) {
      dispatch(loginUser({
        email: data.email,
        password: data.password
      }));
    } else {
      dispatch(registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "https://picsum.photos/800"
      }));
    }
    
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const togglePageMode = () => {
    setPageMode(pageMode === PageMode.LOGIN ? PageMode.SIGNIN : PageMode.LOGIN);
    setUserPassword('');
  }

  const onUserPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  }

  if (submit) {
    return <Box component='div' sx={{ height: '50vh', display: 'flex', alignItems: 'center' }}>
      <Box component='div' alignItems='center' justifyContent='center' display='ruby' >
        <h1>Thank you so much, we will contact you soon! </h1>
        <UiButton 
          title={<Link to="/home">Back to Home</Link>}
          variant={MUIButtonVariant.OUTLINED}
          color={MUIColor.PRIMARY} />
      </Box>
    </Box>
  }

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box display={'flex'} justifyContent={'center'} width={'75%'}>
        <Box
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '45ch' } }}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}>
          <h1>{ pageMode === PageMode.LOGIN ? 'Log in' : 'Sign in'}</h1>
          
          {pageMode === PageMode.SIGNIN &&
          <Box>
            <TextField
              {...register("name", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
              error={Boolean(errors.name)}
              label="Name"
              helperText={errors.name ? 'Incorrect name! No special characters' : ''} />
          </Box> 
          }

          <Box>
            <TextField
              {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }) }
              error={Boolean(errors.email)}
              label="Email"
              helperText={errors.email ? 'Incorrect email! Please check again!' : ''} />
          </Box>

          <Box>
            <TextField
              {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }) }
              error={Boolean(errors.password)}
              label="Password"
              value={userPassword}
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password ? 'Incorrect password! Minimum eight characters, at least one letter and one number!' : ''}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  sx={{ color: 'black' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              }}
              onChange={onUserPasswordChanged} />
          </Box>
        
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
        </Box>
        </Box>
    </Box> 
  )
}