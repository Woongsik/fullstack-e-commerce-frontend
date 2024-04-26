import { useState } from 'react'
import CenteredContainer from '../../components/ui/layout/CenteredContainer'
import GridContainer from '../../components/ui/layout/GridContainer'
import { MUIButtonType, MUIButtonVariant, MUILayout } from '../../misc/types/MUI'
import { Box, TextField, styled } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForgetPassword } from '../../misc/types/User';
import { useTheme } from '../../components/contextAPI/ThemeContext';
import UiRoundButton from '../../components/ui/button/UiRoundButton';
import LoadingAndMessage from '../../components/ui/loadingAndMessage/LoadingAndMessage';
import { apiService } from '../../services/APIService';

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  }
});



export default function ForgetPassword() {
  const { isThemeLight } = useTheme();
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, resetField, formState: { errors } } = useForm<UserForgetPassword>();

  const onSubmit: SubmitHandler<UserForgetPassword> = async (data: UserForgetPassword) => {
    try {
      setLoading(true);
      await apiService.forgetPassword(data);
      setMessage('Successfully reset the password! Check the email');
      resetField('userEmail');
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }

    setLoading(false);
  };

  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
    }    
  };
  
  return (
    <GridContainer sx={{ color: isThemeLight ? 'white' : 'black' }}>
    <CenteredContainer alignItems={MUILayout.FLEX_START} width={'75%'} sx={{ minWidth: '300px', maxWidth: '400px', marginBottom: '50px' }}>
      <FormContainer component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <h1>Forget password</h1>

        <Box>
          <TextField
            {...register("userEmail", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }) }
            error={Boolean(errors.userEmail)}
            label="Email"
            helperText={errors.userEmail && 'Incorrect email address!'}
            sx={textFieldCss} />
        </Box>

        <UiRoundButton
          variant={MUIButtonVariant.CONTAINED}
          theme='black'
          type={MUIButtonType.SUBMIT}
          margin={'20px 0'}>
          Submit
        </UiRoundButton>
      </FormContainer>


      <LoadingAndMessage loading={loading}
        error={error}
        message={message} />
    </CenteredContainer>
  </GridContainer>
  )
}
