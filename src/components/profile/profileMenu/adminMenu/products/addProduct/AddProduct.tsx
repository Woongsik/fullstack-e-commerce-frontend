import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, IconButton, TextField, styled } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';

import CategoriesSelector from '../../../../../ui/cateogriesSelector/CategoriesSelector';
import FileUploader from '../../../../../ui/fileUploader/FileUploader';
import CenteredContainer from '../../../../../ui/layout/CenteredContainer';
import { AppState, useAppDispatch } from '../../../../../../redux/store';
import { registerProduct, updateProduct } from '../../../../../../redux/slices/ProductSlice';
import { apiService } from '../../../../../../services/APIService';
import { MUIButtonVariant, MUIColor } from '../../../../../../misc/types/MUI';
import { Product, ProductInfo } from '../../../../../../misc/types/Product';
import { useTheme } from '../../../../../contextAPI/ThemeContext';
import { Size } from '../../../../../../misc/types/Size';
import SizeButtons from '../../../../../ui/button/SizeButtons/SizeButtons';
import HelperText from '../../../../../ui/helperText/HelperText';
import LoadingAndMessage from '../../../../../ui/loadingAndMessage/LoadingAndMessage';

type Inputs = {
  title: string,
  price: number,
  description: string,
  categoryId: string,
  sizes: Size[],
  images: string[]
}

type Props = {
  product?: Product,
  update?: boolean,
  onUpdate?: (updatedProduct: Product) => void
}

const FormContainer = styled(Box)({
  width: '100%',
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%' 
  }
});

const FileUploaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export default function AddProduct(props: Props) {
  const dispatch = useAppDispatch();

  const { product, update } = props;
  const { isThemeLight } = useTheme();
  const baseCategoryId: string = product ? product.category._id : '';
  const baseSizes: Size[] = product ? product.sizes : [];

  const { loading, error } = useSelector((state: AppState) => state.productReducer);
  const { register, handleSubmit, setValue, clearErrors, reset, formState: { errors } } = useForm<Inputs>();
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  const [categoryId, setCategoryId] = useState<string>(baseCategoryId);
  const [sizes, setSizes] = useState<Size[]>(baseSizes);
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const [uploadImageError, setUploadImageError] = useState<string>('');
  const [newProduct, setNewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (update) {
      updateReady();
    }
  }, [update]);

  const updateReady = () => {
    hiddenInput.current?.click();
  }

  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
    }    
  };

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', image);
    return await apiService.uploadImage(formData);
  }

  const fetchToRegisterProduct = async (data: Inputs, uploadedImages: string[]) => {
    const result = await dispatch(registerProduct({
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      images: uploadedImages,
      sizes: sizes
    }));

    const newProduct: Product = result.payload as Product;
    setNewProduct(newProduct);
    setMessage(`Successfully register new product "${newProduct.title}"`);
  }

  const createNewProduct = async (data: Inputs) => {
    const uploadedImages: string[] = [];
    try {
      if (images.length > 0) {
        for (const image of images) {
          const uploadedUrl: string = await uploadImage(image);
          uploadedImages.push(uploadedUrl);
        }
      }

      fetchToRegisterProduct(data, uploadedImages);
    } catch (e) {
      const error: Error = e as Error;
      setUploadImageError(`Uploading images failed, ${error.message}`);
    }
    
  }

  const updateProductInfo = async (data: Inputs) => {
    console.log('updated', data);

    const productUpdateInfo: Partial<ProductInfo> = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      sizes: sizes // if we get it from data.sizes, it will be converted as string. Use array from useState
    }

    if (product) {
      const response = await dispatch(updateProduct({
        _id: product._id,
        item: productUpdateInfo      
       }));

       const updatedProduct = response.payload as Product;
       if (props.onUpdate) {
        props.onUpdate(updatedProduct);
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
  
  const onCategoryChanged = (categoryId: string) => {
    if (categoryId !== '0') {
      clearErrors('categoryId');
    }

    setValue('categoryId', categoryId);
    setCategoryId(categoryId);
  }

  const onFileChange = (files: File[]) => {
    setImages(files);
  }

  const handleSizeChanges = (sizes: Size[]) => {
    if (sizes.length > 0) {
      clearErrors('sizes');
    }
    
    setValue('sizes', sizes);
    setSizes(sizes);
  }

  const clearFields = (): void => {
    reset();
  } 

  return (
    <CenteredContainer width={'100%'} sx={{ minWidth: '300px'}}>
    { !newProduct && 
      <FormContainer component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
            error={Boolean(errors.title)}
            label="Product name"
            defaultValue={product ? product.title : ''}
            helperText={errors.title && 'Incorrect name! Accept special character only ?.,=-_@'}
            sx={textFieldCss} />   
        </Box>
        <Box>
          <TextField
            {...register("price", { required: true, 
              valueAsNumber: true,
              validate: (value) => value > 0 }) }
            error={Boolean(errors.price)}
            type="number"
            label="Product price"
            defaultValue={product ? product.price : undefined}
            InputProps={{
              inputProps: { 
                min: 0 
              }
            }}
            helperText={errors.price && 'Incorrect price! Only numbers'}
            sx={textFieldCss} />          
        </Box>
        <Box>
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
        <Box margin={'20px -8px 20px 8px !important'}>
          <CategoriesSelector 
            selectedCategoryId={categoryId}
            onCategoryChanged={onCategoryChanged}
            helpertext={'Please select a category'}
            register={{...register("categoryId", { required: true, min: 1, max: 99 }) }}
            error={Boolean(errors.categoryId)} />
        </Box>

        <Box margin={'20px 5px !important'} display={'flex'} alignItems={'center'}>
          <Box marginRight={'5%'}>Sizes:</Box> <SizeButtons 
            selectedValues={product ? product.sizes : []}
            onChange={handleSizeChanges}
            editMode={true} />
        </Box>
        
        <TextField 
          {...register("sizes", { required: true })} 
          value={sizes}
          sx={{ display: 'none' }}/>
          <HelperText show={Boolean(errors.sizes)} text={'Choose one of sizes, at least one!'} margin={'0 0 0 20px'} />
          
        { !product && 
          <FileUploaderWrapper>
            <FileUploader onChange={onFileChange}/>
          </FileUploaderWrapper> 
        }

        {product ? 
          <input type='submit' ref={hiddenInput} style={{ display: 'none' }}/>
        :
        <CenteredContainer width={'100%'} margin={'20px 0'}>
          <Button onClick={clearFields} variant={MUIButtonVariant.OUTLINED} color={MUIColor.ERROR}>Cancel</Button>

          <Button variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY} type={'submit'} sx={{ marginLeft: 2}}>Register</Button>
        </CenteredContainer>
        }
      </FormContainer>
    }

      <LoadingAndMessage 
        loading={loading}
        error={error || uploadImageError}
        message={message} />

    { newProduct &&
    <>           
      <IconButton>
        <Link to={`/product/${newProduct._id}`}>
          <LaunchIcon color={MUIColor.INFO} />
        </Link>
      </IconButton>
    </>
    }
    </CenteredContainer>
  )
}
