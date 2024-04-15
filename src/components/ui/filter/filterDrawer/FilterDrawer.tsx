import { useEffect, useState } from 'react'
import { Box, Drawer, IconButton, styled } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { useTheme } from '../../../contextAPI/ThemeContext';
import { MUILayout, MUIColor, MUIButtonVariant, MUISize } from '../../../../misc/types/MUI';
import { SortCreated, SortType, SortPrice, SortTitle } from '../../../../misc/types/Sort';
import Categories from '../../../cateogries/Categories';
import SortButton from '../../button/SortButton/SortButton';
import UiButton from '../../button/UiButton';
import CenteredContainer from '../../layout/CenteredContainer';
import PageCounter from '../../pageCounter/PageCounter';
import PriceRangeSlider from '../../priceRangeSlider/PriceRangeSlider';
import SearchInput from '../../searchInput/SearchInput';
import { Filter } from '../../../../misc/types/Filter';
import { useSelector } from 'react-redux';
import { updateFilter, fetchProducts } from '../../../../redux/slices/ProductSlice';
import { AppState, useAppDispatch } from '../../../../redux/store';
import { baseItemsPerPage, basePage } from '../../pageNavigation/PageNavigation';
import Sizes from '../../../sizes/Sizes';
import { Size } from '../../../../misc/types/Size';

type Props = {
  clear: boolean;
  open: boolean;
  onClose: () => void;
}
const FilterWrapper = styled(Box)({
  position: 'relative',
  height: '100%',
  margin: '30px'
});

const CloseIconButton = styled(IconButton)({
  color: 'black'
});

const FilterItem = styled(Box)({
  margin: '30px 0'
})

const FilterButtonGroup = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly', 
  alignItems: MUILayout.CENTER,
  marginTop: '50px',
  marginBottom: '20px'
});

export default function FilterDrawer(props: Props) {
  const { open, clear } = props;
  const baseCategoryId: string = '0';
  
  const initialFilter: Partial<Filter> = {
    title: '',
    categoryId: baseCategoryId,
    page: basePage,
    itemsPerPage: baseItemsPerPage
  }

  const filterFromStore: Partial<Filter> | undefined = useSelector((state: AppState) => state.productReducer.filter);
  const [filter, setFilter] = useState<Partial<Filter>>(filterFromStore ?? initialFilter);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { isThemeLight } = useTheme();

  const dispatch = useAppDispatch();
  useEffect(() => { // For the filter changed
    dispatch(updateFilter(filter));
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    clearFilter();
  }, [clear]);

  useEffect(() => {
    if (open) {
      toggleDrawer(open);
    }
  }, [open]);

  const onTextChanged = (text: string): void => {
    if (filter.title !== text) {
      setFilter({
        ...filter,
        title: text,
        page: basePage
      });
    }
  };

  const onCategoryChanged = (categoryId: string): void => {
    if (filter.categoryId !== categoryId) {
      setFilter({
        ...filter,
        categoryId: categoryId,
        page: basePage
      });
    }
  };

  const onSizeChanged = (size?: Size): void => {
    if (filter.size !== size) {
      setFilter({
        ...filter,
        size: size,
        page: basePage
      });
    }
  };

  const onItemsPerPageChanged = (itemsPerPage: number): void => {
    if (filter.itemsPerPage !== itemsPerPage) {
      setFilter({
        ...filter,
        itemsPerPage: itemsPerPage,
        page: basePage
      });
    }
  };

  const onPriceRangeChanged = (range: number[]) => {
    if (filter.min_price !== range[0] || filter.max_price !== range[1]) {
      setFilter({
        ...filter,
        min_price: range[0],
        max_price: range[1],
        page: basePage
      });
    }
  }

  const onSortChanged = (newValue: string | null, type: SortType) => {
    if (filter[type] !== newValue) {
      setFilter({
        ...filter,
        [type]: newValue ?? undefined
      });
    }
  }

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);

    if (!open) {
      props.onClose();
    }
  }

  const clearFilter = () => {
    setFilter(initialFilter);
  }

  return (
    <Drawer 
      open={openDrawer} onClose={() => toggleDrawer(false)}
      sx={{
        '&.MuiDrawer-root > .MuiPaper-root': {
            backgroundColor: isThemeLight ? 'black' : 'white'
          }
      }}>
      <FilterWrapper sx={{ color: isThemeLight ? 'white' : 'black' }}>
        <CenteredContainer width={'100%'} justifyContent={MUILayout.SPACE_BETWEEN}>
          <h1>Filters</h1>
          <CloseIconButton onClick={() => toggleDrawer(false)}>
            <CancelIcon />
          </CloseIconButton>
        </CenteredContainer>
        
        <FilterItem>
          <SearchInput 
            title="Search products by name"
            preText={filter.title}
            onTextChanged={onTextChanged}/>  
        </FilterItem>
        <FilterItem> 
          <Categories 
            selectedCategoryId={filter.categoryId} 
            onCategoryChanged={onCategoryChanged} />
        </FilterItem>

        <FilterItem>
          <Sizes 
            selectedSize={filter.size}
            onSizeChanged={onSizeChanged}/>
        </FilterItem>
        <PriceRangeSlider 
          minPrice={filter.min_price}
          maxPrice={filter.max_price}
          onPriceRangeChanged={onPriceRangeChanged} />
        <FilterItem>
          <PageCounter 
            itemsPerPage={filter.itemsPerPage ?? baseItemsPerPage} 
            onItemsPerPageChanged={onItemsPerPageChanged} />
        </FilterItem>

        <CenteredContainer justifyContent={MUILayout.SPACE_BETWEEN}>
          <Box width={'20%'}>
            Sort by
          </Box>
          <Box width={'60%'}>
            <SortButton
              title={'Created'}
              values={Object.values(SortCreated)}
              selectedValue={filter.sort_created}
              onChange={(value) => onSortChanged(value, SortType.CREATED)} />
            <Box my={2}>
              <SortButton 
                title={'Price'}
                values={Object.values(SortPrice)}
                selectedValue={filter.sort_price}
                onChange={(value) => onSortChanged(value, SortType.PRICE)} />
            </Box>
            <SortButton 
              title={'Title'}
              values={Object.values(SortTitle)}
              selectedValue={filter.sort_title}
              onChange={(value) => onSortChanged(value, SortType.TITLE)}/>
          </Box>
        </CenteredContainer>
      </FilterWrapper>

      <FilterButtonGroup>
        <UiButton color={MUIColor.PRIMARY} variant={MUIButtonVariant.CONTAINED} size={MUISize.LARGE}
          onClick={() => toggleDrawer(false)}>
          Close
        </UiButton>

        <UiButton color={MUIColor.ERROR} variant={MUIButtonVariant.CONTAINED} size={MUISize.LARGE}
          onClick={() => clearFilter()}>
          Clear
        </UiButton>
      </FilterButtonGroup>
    </Drawer>
  )
}
