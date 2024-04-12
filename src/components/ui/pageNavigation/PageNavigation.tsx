import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../../redux/store';
import CenteredContainer from '../layout/CenteredContainer';
import { useTheme } from '../../contextAPI/ThemeContext';
import { updateFilter, fetchProducts } from '../../../redux/slices/ProductSlice';
import { Filter } from '../../../misc/types/Filter';

export const basePage: number = 1; // MUI pagination started from 1
export const baseItemsPerPage: number = 30;

export default function PageNavigation() {
  const { isThemeLight } = useTheme();
  const dispatch = useAppDispatch();
  const { total, filter } = useSelector((state: AppState) => state.productReducer);

  const page: number = filter?.page ?? basePage;
  const itemsPerPage: number = filter?.itemsPerPage ?? baseItemsPerPage;
  const totalPage = Math.ceil(total / itemsPerPage);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    const newFilter: Partial<Filter> = { ...filter, page: value };
    dispatch(updateFilter(newFilter));
    dispatch(fetchProducts(newFilter));
  };

  return (
    <CenteredContainer sx={{ my: 5 }} width={'100%'}>
      <Pagination 
        page={page} 
        onChange={handlePageChange}
        count={totalPage} 
        color='primary'
        sx={{
        '& li > *': {
            color: isThemeLight ? 'white' : 'black'
        }}} />
    </CenteredContainer>
  )
}
