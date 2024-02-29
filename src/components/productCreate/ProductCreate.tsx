import { useState } from 'react';
import { Box, TextField } from '@mui/material';

import Categories from '../cateogries/Categories';
import { SubmitHandler, useForm } from 'react-hook-form';
import UiButton from '../ui/UiButton';
import { MUIButtonType, MUIButtonVariant, MUIColor } from '../../misc/types/MUI';
import FileUploader from '../ui/fileUploader/FileUploader';
import { AppState, useAppDispatch } from '../../redux/store';
import { fetchProductImages, updateProduct } from '../../redux/slices/ProductSlicer';
import { Product, ProductUpdateItem } from '../../misc/types/Product';
import { useSelector } from 'react-redux';

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

export default function ProductCreate(props: Props) {
  const { product } = props;
  const baseCategoryId: number = product ? product.category.id : 0;
  const dispatch = useAppDispatch();
  const { loading , error } = useSelector((state: AppState) => state.productReducer);

  const [categoryId, setCategoryId] = useState<number>(baseCategoryId);
  const [images, setImages] = useState<File[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  const createNewProduct = async (data: Inputs) => {
    console.log('create new product', data);
    
    // upload image => get images url
    // send product with urls to backend to register
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image: File, index: number) => {
        formData.append(`file${index + 1}`, image);
      });

      console.log('fetch images', images.length);
      await dispatch(fetchProductImages(formData));
    }

    // console.log('fetch register product', sample);
    // await dispatch(registerProduct(sample));
    // await dispatch(registerProduct({
    //   title: data.title,
    //   price: data.price,
    //   description: data.description,
    //   categoryId: data.categoryId,
    //   'images': ['https://placeimg.com/640/480/any']
    // }));
  }

  const updateProductInfo = async (data: Inputs) => {
    console.log('update product', data);

    const productUpdateItem: ProductUpdateItem = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: 2
    }

    if (product) {
      await dispatch(updateProduct({
        id: product.id,
        item: productUpdateItem      
       }));

       // now change the edit mode 
       if (props.onUpdate) {
        props.onUpdate();
       }
    }
    
  }

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log('on submit', data, images.length);
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
    <Box>
      <h1>{product ? `Edit Product` : `Create Product`}</h1>
      <Box 
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '45ch' } }}
        onSubmit={handleSubmit(onSubmit)}>
        
        <Box my={1}>
          <TextField
            {...register("title", { required: true, pattern: /^[A-Za-z0-9?.,=_@\- ]+$/i }) }
            error={Boolean(errors.title)}
            label="Product name"
            defaultValue={product ? product.title : ''}
            helperText={errors.title && 'Incorrect name! Accept special character only ?.,=-_@'} />   
        </Box>
        <Box my={1}>
          <TextField
            {...register("price", { required: true, pattern: /^[1-9]+$/i }) }
            error={Boolean(errors.price)}
            type="number"
            label="Product price"
            defaultValue={product ? product.price : 0}
            helperText={errors.price && 'Incorrect price! Only numbers'} />          
        </Box>
        <Box my={1}>
          <TextField
            {...register("description", { required: true, pattern: /^[A-Za-z0-9?.,=_@\- ]+$/i }) }
            error={Boolean(errors.description)}
            label="Product description"
            multiline
            minRows={4}
            defaultValue={product ? product.description : ''}
            helperText={errors.description && 'Incorrect description! Accept special character only ?.,=-_@'} />       
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

          {/* show  exited images */}
        </Box>

        <UiButton
          title={'Submit'}
          variant={MUIButtonVariant.CONTAINED}
          color={MUIColor.PRIMARY}
          type={MUIButtonType.SUBMIT} />
      </Box>

      { error && <h1>ErrorL: {error} </h1> }
    </Box>
  )
}
