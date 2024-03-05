import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchAllCategoriesAsync } from '../../redux/slices/CategorySlice';

import Category from '../../misc/types/Category';
import UiFormSelects from '../uis/form/UiFormSelects';

type Props = {
  selectedCategoryId?: number;
  onCategoryChanged: (categoryId: number) => void;
  register?: any;
  error?: boolean;
  helpertext?: string;
};

export default function Categories(props: Props) {
  const { selectedCategoryId } = props;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const { categories, loading } = useSelector((state: AppState) => state.categoryReducer);
  const allCategory: Category = {
    id: 0,
    name: 'All',
    image: '',
    creationAt: '',
    updatedAt: ''
  }

  const fixedCategories: Category[] = [allCategory, ...categories];

  const handleChange = (value: string) => {
    props.onCategoryChanged(parseInt(value));
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
        displayKey='name'
        valueKey='id'
        size='medium'
        fullWidth={true}
        onChange={handleChange} />
      } 
    </Box>
  )
}
