import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import UiFormSelects from '../form/UiFormSelects';
import { AppState, useAppDispatch } from '../../../redux/store';
import { SortCreated } from '../../../misc/types/Sort';

export default function SortSelects() {
  const filter = useSelector((state: AppState) => state.productReducer.filter);
  const selectedSortType: SortCreated = SortCreated.ASC;
  const items: { key: string }[] = Object.keys(SortCreated)
    .map((key: string) => ({ key: key }));
  items.unshift({ key: 'None'});
  
  const handleSelectChange = (value: string) => {
    
  }

  return (
    <Box width={'100%'}>
      <UiFormSelects 
        title='Sort by Price'
        selectedValue={selectedSortType ?? 'None'}
        items={items}
        displayKey='key'
        valueKey='key'
        size='medium'
        fullWidth={true}
        onChange={handleSelectChange} /> 
    </Box>
  );
}
