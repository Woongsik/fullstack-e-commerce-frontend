import { useEffect } from 'react';
import { 
  Box, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchAllCategoriesAsync } from '../../redux/slices/CategorySlicer';

import Category from '../../misc/types/Category';

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
  
  const handleChange = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;
    props.onCategoryChanged(parseInt(value.toString()));
  }

  return (
    <Box component="div" display="flex" justifyContent="flex-end" alignItems="center" overflow="auto" padding="10px">
      { loading ? <CircularProgress /> : 
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Categories</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategoryId}
          label="Categories"
          onChange={handleChange}>
            <MenuItem value={0} key={0}>All</MenuItem>
            {categories.map((category: Category) => 
              <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>)}
        </Select>
      </FormControl>
      } 
    </Box>
  )
}
