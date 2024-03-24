import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppState } from '../../../redux/store';
import CenteredContainer from '../layout/CenteredContainer';
import { useTheme } from '../../contextAPI/ThemeContext';

type Props = {
  page: number;
  onPageChanged: (page: number) => void;
}

export default function PageNavigation(props: Props) {
  const { page } = props;
  const { isThemeLight } = useTheme();
  const totalPage: number = useSelector((state: AppState) => state.productReducer.total);

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    props.onPageChanged(value);
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
