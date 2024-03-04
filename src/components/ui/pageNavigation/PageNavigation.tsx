import { ChangeEvent } from 'react';
import { Pagination, Grid } from '@mui/material';

import UiFormSelects from '../form/UiFormSelects';
import { FormSelectItem } from '../../../misc/types/Forms';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

type Props = {
  page: number;
  itemsPerPage: number;
  onPageChanged: (page: number) => void;
  onItemsPerPageChanged: (itemsPerPage: number) => void;
}

export default function PageNavigation(props: Props) {
  const { page, itemsPerPage } = props;
  const formSelectItems: FormSelectItem[] = [
    { key: '10', value: '10' },
    { key: '30', value: '30' },
    { key: '50', value: '50' },
    { key: '100', value: '100' }
  ]

  const totalPage: number = useSelector((state: AppState) => state.productReducer.total);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    props.onPageChanged(value);
  };

  const handleSelectChange = (value: string) => {
    props.onItemsPerPageChanged(parseInt(value));  
  };

  return (
    <Grid 
      container 
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ my: 5, backgroundColor: 'white', borderTop: '1px solid gray', position: 'sticky', bottom: '0'}}>
      <Grid item>
        <Pagination 
          page={page} 
          onChange={handlePageChange}
          count={totalPage} 
          color="primary" />
      </Grid>
      
      <Grid item>
        <UiFormSelects 
          title='Items per Page'
          selectedValue={itemsPerPage.toString()}
          items={formSelectItems}
          displayKey="value"
          valueKey="key"
          size='small'
          onChange={handleSelectChange} />
      </Grid>
    </Grid>
  )
}
