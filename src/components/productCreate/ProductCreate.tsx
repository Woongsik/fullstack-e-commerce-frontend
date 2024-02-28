import { ChangeEvent, useState } from 'react';
import { Box, TextField } from '@mui/material';

import Categories from '../cateogries/Categories';
import { SubmitHandler, useForm } from 'react-hook-form';
import UiButton from '../ui/UiButton';
import { MUIButtonType, MUIButtonVariant, MUIColor } from '../../misc/types/MUI';
import FileUploader from '../ui/fileUploader/FileUploader';

type Inputs = {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
}

export default function ProductCreate() {
  const [categoryId, setCategoryId] = useState<number>(0);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [images, setImages] = useState<File[]>([]);
  
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log('on submit', data);

    const formData = new FormData();
    images.forEach((image: File) => {
      formData.append('file', image);
    });
    
    // upload image
    // get images url

    // send product to backend to register

  }
  
  const onCategoryChanged = (categoryId: number) => {
    console.log('category changed', categoryId);
    setCategoryId(categoryId);
  }

  const onFileChange = (files: File[]) => {

  }

  return (
    <Box>
      ProductCreate
      <Box 
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '45ch' } }}
        onSubmit={handleSubmit(onSubmit)}>
        
        <Box my={1}>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
            error={Boolean(errors.title)}
            label="Product name"
            helperText={errors.title && 'Incorrect name! No special characters'} />   
        </Box>
        <Box my={1}>
          <TextField
            {...register("price", { required: true, pattern: /^[0-9]+$/i }) }
            error={Boolean(errors.price)}
            type="number"
            label="Product price"
            helperText={errors.price && 'Incorrect price! Only numbers'} />          
        </Box>
        <Box my={1}>
          <TextField
            {...register("description", { required: true, pattern: /^[A-Za-z0-9]+$/i }) }
            error={Boolean(errors.description)}
            label="Product description"
            multiline
            minRows={4}
            helperText={errors.description && 'Incorrect description! No special character'} />       
        </Box>
        <Box my={1}>
          <Categories 
            selectedCategoryId={categoryId}
            onCategoryChanged={onCategoryChanged} />
            <TextField sx={{ display: 'block'}} // hidden
              {...register("categoryId", {required: true, pattern: /^[1-9]+$/i })}
              error={Boolean(errors.categoryId)}
              value={categoryId}
              helperText={errors.categoryId && 'Incorrect category'} />
               
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
          <FileUploader onChange={onFileChange}/>
        </Box>

        <UiButton
          title={'Submit'}
          variant={MUIButtonVariant.CONTAINED}
          color={MUIColor.PRIMARY}
          type={MUIButtonType.SUBMIT} />
      </Box>
    </Box>
  )
}
