import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import { useAppDispatch, AppState } from '../../../redux/store';
import { fetchAllCategoriesAsync } from '../../../redux/slices/CategorySlice';

import { Category } from '../../../misc/types/Category';
import UiFormSelects from '../form/UiFormSelects';

type Props = {
  selectedCategoryId?: string;
  onCategoryChanged: (categoryId: string) => void;
  register?: any;
  error?: boolean;
  helpertext?: string;
};

export default function CategoriesSelector(props: Props) {
  const { selectedCategoryId } = props;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const { categories, loading } = useSelector((state: AppState) => state.categoryReducer);
  const allCategory: Category = {
    _id: '0',
    title: 'All',
    image: ''
  }

  const fixedCategories: Category[] = [allCategory, ...categories];

  const handleChange = (value: string) => {
    props.onCategoryChanged(value);
  }

  return (
    <Box width={'100%'}>
      { loading ? <CircularProgress /> : 
      <UiFormSelects 
        register={props.register}
        error={props.error}
        helpertext={props.helpertext}
        title='Categories'
        selectedValue={selectedCategoryId?.toString()}
        items={fixedCategories}
        displayKey='title'
        valueKey='_id'
        size='medium'
        fullWidth={true}
        onChange={handleChange} />
      } 
    </Box>
  )
}
