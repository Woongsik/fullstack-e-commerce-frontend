import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Chip, TextField, styled } from '@mui/material';

import { AppState, useAppDispatch } from '../../../../../redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterUserInfo } from '../../../../../misc/types/User';
import { useTheme } from '../../../../contextAPI/ThemeContext';
import CenteredContainer from '../../../../ui/layout/CenteredContainer';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../../../../misc/types/MUI';
import { updateUser } from '../../../../../redux/slices/UserSlice';
import LoadingAndMessage from '../../../../ui/loadingAndMessage/LoadingAndMessage';

enum Mode {
  Edit = 'Edit',
  Read = 'Read'
}

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  },
  width: '100%',
  minWidth: '300px'
});

export default function Account() {
  const [mode, setMode] = useState<Mode>(Mode.Read);
  const dispatch = useAppDispatch();

  const { user, loading, error } = useSelector((state: AppState) => state.userReducer);
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<RegisterUserInfo>>();
  const { isThemeLight } = useTheme();

  const doNotDisplayProperties: string[] = ['_id', '__v', 'password', 'active'];

  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
    }    
  };

  const toggleMode = () => {
    let newMode: Mode = Mode.Read;
    if (mode === Mode.Read) {
      newMode = Mode.Edit;
    }

    setMode(newMode);
  }

  const onSubmit: SubmitHandler<Partial<RegisterUserInfo>> = async (data: Partial<RegisterUserInfo>) => {    
    try {
      await dispatch(updateUser(data));
      setMode(Mode.Read);
    } catch(e) {
      console.log('Update user failed', e);
    }
  }

  return (
  <CenteredContainer alignItems={MUILayout.FLEX_START} width={'75%'} sx={{ minWidth: '300px', maxWidth: '400px'}}>
    { (user && mode === Mode.Read) &&
    <FormContainer>
      <Box width={'100%'}>
      {Object.entries(user).map(([key, value]) =>
        (doNotDisplayProperties.indexOf(key) === -1) &&  
        (<CenteredContainer key={key} width={'100%'} justifyContent={MUILayout.SPACE_BETWEEN} sx={{ minWidth: '300px', margin: '10px 0'}}>
          <Box width={'30%'} minWidth={'100px'}><Chip label={key} variant="outlined" sx={{ textTransform: 'capitalize', width: '100%' }}/></Box>
          <Box width={'65%'} minWidth={'200px'} sx={{ textWrap: 'wrap', overflowWrap: 'break-word' }}>
            <span style={{ textTransform: (key === 'role' ? 'capitalize' : 'none' )}}>
              {value}
            </span>
          </Box>
        </CenteredContainer>)
      )}
      </Box>

      <CenteredContainer width={'100%'} margin='20px 0'>
        <Button 
          onClick={toggleMode}
          variant={MUIButtonVariant.CONTAINED} 
          color={MUIColor.PRIMARY}>Edit</Button>
      </CenteredContainer>
    </FormContainer>
    }

    { (user && mode === Mode.Edit) &&
    <FormContainer component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          {...register("firstname", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
          error={Boolean(errors.firstname)}
          label="First name"
          helperText={errors.firstname && 'No special characters'}
          defaultValue={user.firstname}
          sx={textFieldCss} />
      </Box> 

      <Box>
        <TextField
          {...register("lastname", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
          error={Boolean(errors.lastname)}
          label="Last name"
          helperText={errors.lastname && 'No special characters'}
          defaultValue={user.lastname}
          sx={textFieldCss} />
      </Box> 
      
      <Box>
        <TextField
          {...register("username", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
          error={Boolean(errors.username)}
          label="User name"
          helperText={errors.username && 'No special characters'}
          defaultValue={user.username}
          sx={textFieldCss} />
      </Box>

      <Box>
        <TextField
          {...register("avatar", { pattern: /[A-Za-z0-9]+[://]+[A-Za-z0-9-]+[.]/ }) }                                                          
          error={Boolean(errors.avatar)}
          label="Avatar"
          helperText={errors.avatar && 'Only valid URL accepted'}
          defaultValue={user.avatar ?? "https://picsum.photos/800"}
          sx={textFieldCss} />
      </Box>

      <Box>
        <TextField
          {...register("address", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
          error={Boolean(errors.address)}
          label="Address"
          helperText={errors.avatar && 'Special characters (?.,=_@&-) accepted'}
          defaultValue={user.address}
          sx={textFieldCss} />
      </Box>

      <CenteredContainer width={'100%'} margin={'20px 0'}>
        <Button onClick={toggleMode} variant={MUIButtonVariant.OUTLINED} color={MUIColor.ERROR}>Cancel</Button>

        <Button variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} type={'submit'} sx={{ marginLeft: 2}}>Update</Button>
      </CenteredContainer>
    </FormContainer>
  }

    <LoadingAndMessage 
      loading={loading} 
      error={error} />
  </CenteredContainer>
)
}
