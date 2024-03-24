import { useState, useEffect } from 'react'
import { Box, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import SearchInput from '../../components/ui/searchInput/SearchInput';
import ProductList from '../../components/product/productList/ProductList';
import Categories from '../../components/cateogries/Categories';
import PageNavigation from '../../components/ui/pageNavigation/PageNavigation';
import SortSelects from '../../components/ui/sortSelects/SortSelects';
import PriceRangeSlider from '../../components/ui/priceRangeSlider/PriceRangeSlider';
import CenteredContainer from '../../components/ui/layout/CenteredContainer';
import GridContainer from '../../components/ui/layout/GridContainer';
import PageCounter from '../../components/ui/pageCounter/PageCounter';
import UiButton from '../../components/ui/button/UiButton';
import ScrollToTop from '../../components/ui/scrollToTop/ScrollToTop';
import { useAppDispatch, AppState } from '../../redux/store';
import { fetchProducts, updateFilter } from '../../redux/slices/ProductSlice';
import { useUserSession } from '../../hooks/useUserSession';
import { Product } from '../../misc/types/Product';
import Filter from '../../misc/types/Filter';
import { MUIButtonVariant, MUIColor, MUILayout } from '../../misc/types/MUI';
import { useTheme } from '../../components/contextAPI/ThemeContext';

export default function Home() {
  const baseCategoryId: number = 0;
  const basePage: number = 1; // MUI pagination started from 1
  const baseItemsPerPage: number = 30;

  const initialFilter: Filter = {
    title: '',
    categoryId: baseCategoryId,
    page: basePage,
    itemsPerPage: baseItemsPerPage
  }

  const filterFromStore: Filter | undefined = useSelector((state: AppState) => state.productReducer.filter);
  const [filter, setFilter] = useState<Filter>(filterFromStore ?? initialFilter);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { isThemeLight } = useTheme();
  
  const products: Product[] = useSelector((state: AppState): Product[] => 
    state.productReducer.sort ? state.productReducer.sortedProducts : state.productReducer.products);
  
  useUserSession();
  useEffect(() => { // For the filter changed
    dispatch(updateFilter(filter));
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);
  
  const onTextChanged = (text: string): void => {
    setFilter({
      ...filter,
      title: text,
      page: basePage
    });
  };

  const onCategoryChanged = (categoryId: number): void => {
    setFilter({
      ...filter,
      categoryId: categoryId,
      page: basePage
    });
  };

  const onPageChanged = (page: number): void => {
    setFilter({
      ...filter,
      page: page
    });
  };

  const onItemsPerPageChanged = (itemsPerPage: number): void => {
    setFilter({
      ...filter,
      itemsPerPage: itemsPerPage,
      page: basePage
    });
  };

  const onPriceRangeChanged = (range: number[]) => {
    setFilter({
      ...filter,
      price_min: range[0],
      price_max: range[1],
      price: undefined,
      page: basePage
    }); 
  }

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  }

  const clearFilter = () => {
    setFilter(initialFilter);
  }

  const FilterIndicator = () => (
    <CenteredContainer height={'50px'}  width={'100%'} sx={{ position: 'sticky', top: 0}}>
      <CenteredContainer  sx={{ backgroundColor: isThemeLight ? 'white' : 'black', borderRadius: '30px' }} margin={'5px'}>
        <CenteredContainer sx={{ color: isThemeLight ? 'black' : 'white', padding: '5px 20px'}} >
          <CenteredContainer onClick={() => toggleDrawer(true)} sx={{ cursor: 'pointer', marginRight: 1 }}>
            <SearchIcon /> Search
          </CenteredContainer>
          <Box onClick={() => clearFilter()} sx={{ cursor: 'pointer', marginLeft: 1 }}>
            <CancelIcon sx={{ color: isThemeLight ? 'black' : 'white' }}/>
          </Box>
        </CenteredContainer>
      </CenteredContainer>
    </CenteredContainer>
  );

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <FilterIndicator />
      <CenteredContainer alignItems={MUILayout.FLEX_START} width='75%' sx={{ minWidth: '300px', overflow: 'auto', margin: '10px 0' }}>
        <ProductList products={products} />
        <PageNavigation 
          page={filter.page ?? basePage}
          onPageChanged={onPageChanged}
        />
      </CenteredContainer>
      <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box margin={3}>
          <Box width={'100%'} display={'flex'} justifyContent={MUILayout.FLEX_END}>
            <UiButton color={MUIColor.PRIMARY} variant={MUIButtonVariant.OUTLINED}
              onClick={() => toggleDrawer(false)}>
              Close
            </UiButton>
          </Box>
          <h1>Filters</h1>
          <Box my={2}>
            <SearchInput 
              title="Search products by name"
              preText={filter.title}
              onTextChanged={onTextChanged}/>  
          </Box>
          <Box my={3}> 
            <Categories 
              selectedCategoryId={filter.categoryId} 
              onCategoryChanged={onCategoryChanged} />
          </Box>
          <Box my={3}>
            <SortSelects />
          </Box>
          <PriceRangeSlider 
            minPrice={filter.price_min}
            maxPrice={filter.price_max}
            onPriceRangeChanged={onPriceRangeChanged} />
          <Box my={3}>
            <PageCounter itemsPerPage={filter.itemsPerPage ?? baseItemsPerPage} onItemsPerPageChanged={onItemsPerPageChanged} />
          </Box>
        </Box>
      </Drawer>
      <ScrollToTop />
    </GridContainer>
  )
}
