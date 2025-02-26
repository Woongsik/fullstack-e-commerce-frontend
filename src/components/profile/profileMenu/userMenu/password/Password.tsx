import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { MUIButtonVariant, MUIColor } from '../../../../../misc/types/MUI';
import { PasswordUpdate } from '../../../../../misc/types/User';
import CenteredContainer from '../../../../ui/layout/CenteredContainer';
import { AppState, useAppDispatch } from '../../../../../redux/store';
import { useTheme } from '../../../../contextAPI/ThemeContext';
import { clearError, updateUserPassword } from '../../../../../redux/slices/UserSlice';
import LoadingAndMessage from '../../../../ui/loadingAndMessage/LoadingAndMessage';

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  },
  width: '100%',
  minWidth: '300px'
});

export default function Password() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { isThemeLight } = useTheme();
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: AppState) => state.userReducer);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordUpdate>();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const themeColor = { color: isThemeLight ? 'white' : '' }
  const themeBordeColor = { borderColor: isThemeLight ? 'white' : '' }
  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      ...themeColor,
      ...themeBordeColor
    }    
  };

  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  }

  const clearFields = (): void => {
    reset();
  } 

  const onSubmit: SubmitHandler<PasswordUpdate> = async (data: PasswordUpdate) => {    
    try {
      const response = await dispatch(updateUserPassword(data));

      if (response && response.payload) {
        setMessage('Successfully changed!');
        reset();
      }
    } catch(e) {
      console.log('Update user passwword failed', e);
      // Error message from userSlice 
    }
  }

  return (
    <CenteredContainer width={'75%'} sx={{ minWidth: '300px', maxWidth: '400px'}}>
      <FormContainer component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              {...register("oldPassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ }) }  
              error={Boolean(errors.oldPassword)}
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.oldPassword && 'Minimum 8 characters, at least 1 letter & 1 number! Special characters: (@$!%*#?&) accepted'}
              sx={textFieldCss}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  sx={themeColor}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              }}/>
          </Box>

          <Box>
            <TextField
              {...register("newPassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ }) }  
              error={Boolean(errors.oldPassword)}
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.newPassword && 'Minimum 8 characters, at least 1 letter & 1 number! Special characters: (@$!%*#?&) accepted'}
              sx={textFieldCss}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  sx={themeColor}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              }}/>
          </Box>

          <CenteredContainer width={'100%'} margin={'20px 0'}>
            <Button onClick={clearFields} variant={MUIButtonVariant.OUTLINED} color={MUIColor.ERROR}>Cancel</Button>

            <Button variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} type={'submit'} sx={{ marginLeft: 2}}>Update</Button>
          </CenteredContainer>
      </FormContainer>

      <LoadingAndMessage loading={loading} error={error} message={message} />
    </CenteredContainer>
  )
}
