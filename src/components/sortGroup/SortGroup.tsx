import React from 'react';
import { Box } from '@mui/material';

import Sort from '../../misc/types/Sort';
import FormSelects from '../ui/FormSelects';
import { useAppDispatch } from '../../redux/store';
import { sortBy } from '../../redux/slices/ProductSlicer';


export default function SortGroup() {
  const disptch = useAppDispatch();
  const items: { key: string }[] = Object.keys(Sort).map((key: string) => ({
    key: key
  }))
  
  const handleSelectChange = (key: string) => {
    console.log('key', key);
    disptch(sortBy(key as Sort));
    // props.onSortChanged(Sort[key]);
  }
  return (
    <Box>
      <FormSelects 
        title='Sort by'
        selectedValue=''
        items={items}
        displayKey='key'
        valueKey='key'
        size='small'
        onChange={handleSelectChange}
      /> 
    </Box>
  );
}
