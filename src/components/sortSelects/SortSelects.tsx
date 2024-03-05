import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import UiFormSelects from '../uis/form/UiFormSelects';
import { AppState, useAppDispatch } from '../../redux/store';
import { sortBy } from '../../redux/slices/ProductSlice';
import Sort from '../../misc/types/Sort';

export default function SortSelects() {
  const dispatch = useAppDispatch();
  
  const selectedSortType: Sort | undefined = useSelector((state: AppState) => state.productReducer.sort);
  const items: { key: string }[] = Object.keys(Sort)
    .map((key: string) => ({ key: key }));
  items.unshift({ key: 'All'});
  
  const handleSelectChange = (value: string) => {
    dispatch(sortBy(value as Sort));
  }

  return (
    <Box>
      <UiFormSelects 
        title='Sort by'
        selectedValue={selectedSortType ?? 'All'}
        items={items}
        displayKey='key'
        valueKey='key'
        size='small'
        onChange={handleSelectChange} /> 
    </Box>
  );
}
