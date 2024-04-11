import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

import Categories from '../../cateogries/Categories';
import FileUploader from '../../ui/fileUploader/FileUploader';
import CenteredContainer from '../../ui/layout/CenteredContainer';
import UiRoundButton from '../../ui/button/UiRoundButton';
import LoadingBackdrop from '../../ui/loading/LoadingBackdrop';
import { AppState, useAppDispatch } from '../../../redux/store';
import { registerProduct, updateProduct } from '../../../redux/slices/ProductSlice';
import { apiService } from '../../../services/APIService';
import { MUIButtonType, MUIButtonVariant, MUILayout } from '../../../misc/types/MUI';
import { Product } from '../../../misc/types/Product';
import { UploadedImage } from '../../../misc/types/UploadedImage';
import { useTheme } from '../../contextAPI/ThemeContext';
import { Size } from '../../../misc/types/Size';

type Inputs = {
  title: string,
  price: number,
  description: string,
  categoryId: number,
  images: string[]
}

type Props = {
  product?: Product,
  onUpdate?: () => void
}

export default function ProductCreateOrUpdate(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product } = props;
  const { isThemeLight } = useTheme();
  const baseCategoryId: number = product ? product.category.id : 0;
  const { loading, error } = useSelector((state: AppState) => state.productReducer);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  const [categoryId, setCategoryId] = useState<number>(baseCategoryId);
  const [images, setImages] = useState<File[]>([]);

  // If use styled(), TextField trigger out of focus
  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : 'black',
      borderColor: isThemeLight ? 'white' : 'black'
    }    
  };

  const uploadImage = async (image: File): Promise<UploadedImage> => {
    const formData = new FormData();
    formData.append('file', image);
    const uploadedInfo: UploadedImage = await apiService.fetchProductImages(formData);
    return uploadedInfo;
  }

  const fetchToRegisterProduct = async (data: Inputs, uploadedImages: string[]) => {
    const result = await dispatch(registerProduct({
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      images: uploadedImages,
      sizes: [Size.Large, Size.Small]
    }));

    const newProduct: Product = result.payload as Product;
    if (!error && newProduct) {
      navigate(`/product/${newProduct._id}`);
    }
  }

  const createNewProduct = async (data: Inputs) => {
    const uploadedImages: string[] = [];
    if (images.length > 0) {
      images.forEach(async (image: File, index: number) => {
        const uploadedImage: UploadedImage = await uploadImage(image);
        uploadedImages.push(uploadedImage.location);

        if (index === (images.length - 1)) {
          fetchToRegisterProduct(data, uploadedImages);
        }
      });   
    } else {
      fetchToRegisterProduct(data, uploadedImages);
    }
  }

  const updateProductInfo = async (data: Inputs) => {
    const productUpdateItem: Partial<Product> = {
      title: data.title,
      price: data.price,
      description: data.description,
      // categories: data.categoryId
    }

    if (product) {
      await dispatch(updateProduct({
        id: product._id,
        item: productUpdateItem      
       }));

       if (props.onUpdate) {
        props.onUpdate();
       }
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    if (product) {
      updateProductInfo(data);
    } else {
      createNewProduct(data);
    }
  }
  
  const onCategoryChanged = (categoryId: number) => {
    setCategoryId(categoryId);
  }

  const onFileChange = (files: File[]) => {
    setImages(files);
  }

  return (
    <CenteredContainer 
      width={'50%'}
      alignItems={MUILayout.FLEX_START}
      sx={{ minWidth: '300px', color: isThemeLight ? 'white': 'black' }}>
      <Box 
        component="form"
        width={'100%'}
        sx={{'& .MuiTextField-root': { m: 1, width: '100%' } }}
        onSubmit={handleSubmit(onSubmit)}>

        <h1>{product ? `Edit Product` : `Create Product`}</h1>
        
        <Box my={1}>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
            error={Boolean(errors.title)}
            label="Product name"
            defaultValue={product ? product.title : ''}
            helperText={errors.title && 'Incorrect name! Accept special character only ?.,=-_@'}
            sx={textFieldCss} />   
        </Box>
        <Box my={1}>
          <TextField
            {...register("price", { required: true, 
              valueAsNumber: true,
              validate: (value) => value > 0 }) }
            error={Boolean(errors.price)}
            type="number"
            label="Product price"
            defaultValue={product ? product.price : 0}
            InputProps={{
              inputProps: { 
                min: 0 
              }
            }}
            helperText={errors.price && 'Incorrect price! Only numbers'}
            sx={textFieldCss} />          
        </Box>
        <Box my={1}>
          <TextField
            {...register("description", { required: true, pattern: /^[A-Za-z0-9?.,=_@&!'\- ]+$/i }) }
            error={Boolean(errors.description)}
            label="Product description"
            multiline
            minRows={4}
            defaultValue={product ? product.description : ''}
            helperText={errors.description && 'Incorrect description! Accept special character only ?.,=-_@&!'}
            sx={textFieldCss} />       
        </Box>
        <Box my={1} marginLeft={1}>
          <Categories 
            selectedCategoryId={categoryId}
            onCategoryChanged={onCategoryChanged}
            helpertext={'Please select a category'}
            register={{...register("categoryId", { required: true, min: 1, max: 99 }) }}
            error={Boolean(errors.categoryId)} />
        </Box>

        { !product && 
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={1}>
            <FileUploader onChange={onFileChange}/>
          </Box> 
        }

        <UiRoundButton 
          theme='black'
          variant={MUIButtonVariant.CONTAINED}
          type={MUIButtonType.SUBMIT}
          margin={'30px 0'}>
            Submit
        </UiRoundButton>
      </Box>

      <LoadingBackdrop loading={loading} />
      { error && <h1>Error: {error} </h1>}
    </CenteredContainer>
  )
}
