import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';

import { MUIButtonVariant, MUIColor } from '../../../misc/types/MUI';
import CenteredContainer from '../../ui/layout/CenteredContainer';
import { useTheme } from '../../contextAPI/ThemeContext';
import { CategoryBase } from '../../../misc/types/Category';
import LoadingAndMessage from '../../ui/loadingAndMessage/LoadingAndMessage';
import { apiService } from '../../../services/APIService';

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  },
  width: '100%',
  minWidth: '300px'
});

export default function AddCategory() {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { isThemeLight } = useTheme();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryBase>();

  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
    }    
  };

  const clearFields = (): void => {
    reset();
  } 

  const onSubmit: SubmitHandler<CategoryBase> = async (data: CategoryBase) => {    
    try {
      setLoading(true);
      const newCategory = await apiService.registerCategory(data);
      setMessage('Successfully registered!');
      reset();
    } catch(e) {
      const error = e as Error;
      setError(`Cannot create category, ${error.message}`);
    }

    setLoading(false);
  }

  return (
    <CenteredContainer width={'75%'} sx={{ minWidth: '300px', maxWidth: '400px'}}>
      <FormContainer component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
            error={Boolean(errors.title)}
            label="Category title"
            helperText={errors.title && 'No special characters, only (?.,=_@&\-) accepted'}
            sx={textFieldCss} />
        </Box>
        
        <Box>
            <TextField
            {...register("image", { value: "https://picsum.photos/800", pattern: /[A-Za-z0-9]+[://]+[A-Za-z0-9-]+[\/.]/ }) }                                                          
            error={Boolean(errors.image)}
            label="Category image"
            helperText={errors.image && 'Only valid URL accepted'}
            sx={textFieldCss} />
        </Box>

        <CenteredContainer width={'100%'} margin={'20px 0'}>
          <Button onClick={clearFields} variant={MUIButtonVariant.OUTLINED} color={MUIColor.ERROR}>Cancel</Button>

          <Button variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} type={'submit'} sx={{ marginLeft: 2}}>Register</Button>
        </CenteredContainer>
      </FormContainer>

      <LoadingAndMessage 
        loading={loading}
        error={error}
        message={message} />
    </CenteredContainer>
  )
}
