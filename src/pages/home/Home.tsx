import { useState, useEffect } from 'react'
import { Box, ButtonGroup, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchProducts, updateFilter } from '../../redux/slices/ProductSlice';
import SearchInput from '../../components/uis/searchInput/SearchInput';
import ProductList from '../../components/productList/ProductList';
import Categories from '../../components/cateogries/Categories';
import PageNavigation from '../../components/uis/pageNavigation/PageNavigation';
import SortSelects from '../../components/sortSelects/SortSelects';
import PriceRangeSlider from '../../components/priceRangeSlider/PriceRangeSlider';
import GridContainer from '../../components/uis/layout/GridContainer';
import { useUserSession } from '../../hooks/useUserSession';
import { Product } from '../../misc/types/Product';
import Filter from '../../misc/types/Filter';
import CenteredContainer from '../../components/uis/layout/CenteredContainer';
import { MUILayout } from '../../misc/types/MUI';
import PageCounter from '../../components/uis/pageCounter/PageCounter';

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

  const [filter, setFilter] = useState<Filter>(initialFilter);
  const dispatch = useAppDispatch();
  
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

  const onPriceChanged = (value: number) => {
    setFilter({
      ...filter,
      price_min: undefined,
      price_max: undefined,
      price: value,
      page: basePage
    });
  }

  const onPriceRangeChanged = (range: number[]) => {
    setFilter({
      ...filter,
      price_min: range[0],
      price_max: range[1],
      price: undefined,
      page: basePage
    }); 
  }

  return (
    <GridContainer alignItems={MUILayout.FLEX_START}>
      <CenteredContainer width="75%" alignItems={MUILayout.FLEX_START} justifyContent={MUILayout.SPACE_BETWEEN}>
        <CenteredContainer alignItems={MUILayout.FLEX_START} width='25%' sx={{ minWidth: '200px' }}>
          <Box>
            <SearchInput 
              title="Search products by name"
              onTextChanged={onTextChanged}/>      
            <Categories 
              selectedCategoryId={filter.categoryId} 
              onCategoryChanged={onCategoryChanged} />
            <SortSelects />
            <PriceRangeSlider 
              start={0}
              end={100}
              minPrice={filter.price_min}
              maxPrice={filter.price_max}
              onPriceRangeChanged={onPriceRangeChanged} />
            <PageCounter itemsPerPage={filter.itemsPerPage} onItemsPerPageChanged={onItemsPerPageChanged} />
        </Box>
          
        </CenteredContainer>
        
        <CenteredContainer alignItems={MUILayout.FLEX_START} width='70%' sx={{ minWidth: '300px', overflow: 'auto' }}>
          <ProductList products={products} />
          <PageNavigation 
            page={filter.page}
            onPageChanged={onPageChanged}
          />
        </CenteredContainer>
        
        
      </CenteredContainer>
    </GridContainer>
  )
}
