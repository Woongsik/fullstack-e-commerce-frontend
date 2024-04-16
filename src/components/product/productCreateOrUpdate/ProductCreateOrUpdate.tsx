import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormHelperText, TextField, styled } from '@mui/material';

import Categories from '../../cateogries/Categories';
import FileUploader from '../../ui/fileUploader/FileUploader';
import CenteredContainer from '../../ui/layout/CenteredContainer';
import UiRoundButton from '../../ui/button/UiRoundButton';
import LoadingBackdrop from '../../ui/loading/LoadingBackdrop';
import { AppState, useAppDispatch } from '../../../redux/store';
import { registerProduct, updateProduct } from '../../../redux/slices/ProductSlice';
import { apiService } from '../../../services/APIService';
import { MUIButtonType, MUIButtonVariant, MUILayout } from '../../../misc/types/MUI';
import { Product, ProductInfo } from '../../../misc/types/Product';
import { UploadedImage } from '../../../misc/types/UploadedImage';
import { useTheme } from '../../contextAPI/ThemeContext';
import { Size } from '../../../misc/types/Size';
import SizeButtons from '../../ui/button/SizeButtons/SizeButtons';

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
  onUpdate?: () => void
}

const FormContainer = styled(Box)({
  width: '100%',
  '& .MuiTextField-root': { 
    margin: '10px', 
    width: '100%' 
  }
});

const InfoWapper = styled(Box)({
  marginTop: '10px',
  marginBottom: '10px'
});

const FileUploaderWrapper = styled(InfoWapper)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export default function ProductCreateOrUpdate(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { product } = props;
  const { isThemeLight } = useTheme();
  const baseCategoryId: string = product ? product.category._id : '';
  const baseSizes: Size[] = product ? product.sizes : [];
  console.log('baseSize', baseSizes);

  const { loading, error } = useSelector((state: AppState) => state.productReducer);
  const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<Inputs>();
  
  const [categoryId, setCategoryId] = useState<string>(baseCategoryId);
  const [sizes, setSizes] = useState<Size[]>(baseSizes);
  const [images, setImages] = useState<File[]>([]);
  
  const textFieldCss = {
    '&.MuiFormControl-root > *, &.MuiFormControl-root > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
      color: isThemeLight ? 'white' : '',
      borderColor: isThemeLight ? 'white' : ''
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
      sizes: sizes
    }));

    const newProduct: Product = result.payload as Product;
    if (!error && newProduct) { // TODO Chek new product and check updated product
      navigate(`/product/${newProduct._id}`);
    }
  }

  const createNewProduct = async (data: Inputs) => {
    const uploadedImages: string[] = [];
    // if (images.length > 0) {
    //   images.forEach(async (image: File, index: number) => {
    //     const uploadedImage: UploadedImage = await uploadImage(image);
    //     uploadedImages.push(uploadedImage.location);

    //     if (index === (images.length - 1)) {
    //       fetchToRegisterProduct(data, uploadedImages);
    //     }
    //   });   
    // } else {
      fetchToRegisterProduct(data, uploadedImages);
    //}
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
      await dispatch(updateProduct({
        _id: product._id,
        item: productUpdateInfo      
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

  return (
    <CenteredContainer 
      width={'50%'}
      alignItems={MUILayout.FLEX_START}
      sx={{ minWidth: '300px', color: isThemeLight ? 'white': 'black' }}>
      <FormContainer component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <h1>{product ? `Edit Product` : `Create Product`}</h1>
        <InfoWapper>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
            error={Boolean(errors.title)}
            label="Product name"
            defaultValue={product ? product.title : ''}
            helperText={errors.title && 'Incorrect name! Accept special character only ?.,=-_@'}
            sx={textFieldCss} />   
        </InfoWapper>
        <InfoWapper>
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
        </InfoWapper>
        <InfoWapper>
          <TextField
            {...register("description", { required: true, pattern: /^[A-Za-z0-9?.,=_@&!'\- ]+$/i }) }
            error={Boolean(errors.description)}
            label="Product description"
            multiline
            minRows={4}
            defaultValue={product ? product.description : ''}
            helperText={errors.description && 'Incorrect description! Accept special character only ?.,=-_@&!'}
            sx={textFieldCss} />       
        </InfoWapper>
        <InfoWapper margin={'20px -8px 20px 8px !important'}>
          <Categories 
            selectedCategoryId={categoryId}
            onCategoryChanged={onCategoryChanged}
            helpertext={'Please select a category'}
            register={{...register("categoryId", { required: true, min: 1, max: 99 }) }}
            error={Boolean(errors.categoryId)} />
        </InfoWapper>

        <InfoWapper margin={'20px 5px !important'} display={'flex'} alignItems={'center'}>
          Sizes: <SizeButtons 
            selectedValues={product ? product.sizes : []}
            onChange={handleSizeChanges}/>
        </InfoWapper>
        <TextField 
          {...register("sizes", { required: true })} 
          value={sizes}
          sx={{ display: 'none' }}/>
        {errors.sizes && <FormHelperText sx={{ color: '#d32f2f', marginLeft: 2 }}>Choose one of sizes, at least one!</FormHelperText>}
          
        { !product && 
          <FileUploaderWrapper>
            <FileUploader onChange={onFileChange}/>
          </FileUploaderWrapper> 
        }

        <UiRoundButton 
          theme='black'
          variant={MUIButtonVariant.CONTAINED}
          type={MUIButtonType.SUBMIT}
          margin={'30px 0'}>
            Submit
        </UiRoundButton>
      </FormContainer>

      <LoadingBackdrop loading={loading} />
      { error && <h1>Error: {error} </h1>}
    </CenteredContainer>
  )
}
