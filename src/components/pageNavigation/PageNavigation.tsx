import React from 'react';
import { 
  Pagination, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  Grid } from '@mui/material';

type Props = {
  page: number;
  itemsPerPage: number;
  onPageChanged: (page: number) => void;
  onItemsPerPageChanged: (itemsPerPage: number) => void;
}

export default function PageNavigation(props: Props) {
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    props.onItemsPerPageChanged(parseInt(value));  
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    props.onPageChanged(value);
  };

  return (
    <Grid 
      container 
      justifyContent="space-between"
      alignItems="center"
      sx={{ my: 5, backgroundColor: 'white', borderTop: '1px solid gray', position: 'sticky', bottom: '0'}}>
      <Grid item>
        <Pagination 
          page={props.page} 
          onChange={handlePageChange}
          count={10} 
          color="primary" />
      </Grid>
      
      <Grid item>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="items-per-page-label">Items per Page</InputLabel>
          <Select
            labelId="items-per-page-label"
            value={props.itemsPerPage.toString()}
            label="Items per Page"
            onChange={handleSelectChange}>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
