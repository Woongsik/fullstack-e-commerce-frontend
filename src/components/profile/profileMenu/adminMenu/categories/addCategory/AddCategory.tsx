import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';

import { MUIButtonVariant, MUIColor } from '../../../../../../misc/types/MUI';
import CenteredContainer from '../../../../../ui/layout/CenteredContainer';
import { useTheme } from '../../../../../contextAPI/ThemeContext';
import { CategoryBase } from '../../../../../../misc/types/Category';
import LoadingAndMessage from '../../../../../ui/loadingAndMessage/LoadingAndMessage';
import { apiService } from '../../../../../../services/APIService';
import FileUploader from '../../../../../ui/fileUploader/FileUploader';

const FormContainer = styled(Box)({
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%', 
    minWidth: '300px' 
  },
  width: '100%',
  minWidth: '300px'
});

const FileUploaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export default function AddCategory() {
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);

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

  const onFileChange = (files: File[]) => {
    setImages(files);
  }

  const registerCategory = async (data: CategoryBase) => {
    try {
      await apiService.registerCategory(data);
    } catch (e) {
      const error = e as Error;
      setError(`Cannot create category, ${error.message}`);
    }
  }

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', image);
    return await apiService.uploadImage(formData);
  }

  const onSubmit: SubmitHandler<CategoryBase> = async (data: CategoryBase) => {    
    const uploadedImages: string[] = [];

    try {
      setLoading(true);

      if (images.length > 0) { 
        const image: File = images[0]; // only 1 image allowed
        const uploadedUrl: string = await uploadImage(image);
        uploadedImages.push(uploadedUrl);     
      }

      await registerCategory({
        title: data.title,
        image: uploadedImages[0] // only 1 image allowed
      });

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
            helperText={errors.title && 'No special characters, only (?.,=_@&-) accepted'}
            sx={textFieldCss} />
        </Box>

        <FileUploaderWrapper>
          <FileUploader 
            multiple={false}
            onChange={onFileChange} />
        </FileUploaderWrapper> 
        
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
