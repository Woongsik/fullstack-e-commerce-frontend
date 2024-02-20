import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchAllCategoriesAsync } from '../../redux/slices/CategorySlicer';

import Category from '../../misc/types/Category';
import FormSelects from '../ui/FormSelects';

type Props = {
  selectedCategoryId?: number;
  onCategoryChanged: (categoryId: number) => void;
};

export default function Categories(props: Props) {
  const { selectedCategoryId } = props;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const { categories, loading, error } = useSelector((state: AppState) => state.categoryReducer);
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
    <Box component="div" display="flex" justifyContent="flex-end" alignItems="center" overflow="auto" padding="10px">
      { loading ? <CircularProgress /> : 
      <FormSelects 
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
