import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import { AppState, useAppDispatch } from '../../../../../../redux/store';
import CenteredContainer from '../../../../../ui/layout/CenteredContainer';
import LoadingAndMessage from '../../../../../ui/loadingAndMessage/LoadingAndMessage';
import { Category } from '../../../../../../misc/types/Category';
import CategoryDetailsRow from './categoryDetail/CategoryDetailsRow';
import { fetchAllCategoriesAsync } from '../../../../../../redux/slices/CategorySlice';

export default function AllCategories() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, []);

  const { categories, loading, error } = useSelector((state: AppState) => state.categoryReducer);

  return (
  <CenteredContainer width='100%' sx={{ minWidth: '300px' }}>
    {(categories && categories.length > 0) &&
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category: Category) => (
              <CategoryDetailsRow key={category._id} category={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    {(!loading && categories && categories.length === 0) &&  <h1>No Categories yet...</h1>}

    <LoadingAndMessage loading={loading} error={error} />
  </CenteredContainer>  )
}
