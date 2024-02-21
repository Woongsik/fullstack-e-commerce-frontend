import { useState, useEffect } from 'react'
import { Box, ButtonGroup, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/ProductSlicer';

import SearchInput from '../../components/searchInput/SearchInput';
import ProductList from '../../components/productList/ProductList';
import Categories from '../../components/cateogries/Categories';
import PageNavigation from '../../components/pageNavigation/PageNavigation';
import SortSelects from '../../components/sortSelects/SortSelects';

import Product from '../../misc/types/Product';
import Filter from '../../misc/types/Filter';
import PriceRangeSlider from '../../components/priceRangeSlider/PriceRangeSlider';

export default function Home() {
  const baseCategoryId: number = 0;
  const basePage: number = 1; // MUI pagination started from 1
  const baseItemsPerPage: number = 10;

  const initialFilter: Filter = {
    title: '',
    categoryId: baseCategoryId,
    page: basePage,
    itemsPerPage: baseItemsPerPage
  }

  const [filter, setFilter] = useState<Filter>(initialFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [filter, dispatch]);
  
  const products: Product[] = useSelector((state: AppState): Product[] => 
    state.productReducer.sort ? state.productReducer.sortedProducts : state.productReducer.products);
  
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
    <Box component="div" display="flex" justifyContent="center" alignItems="center">
      <Box component="div" width="50%" minWidth="500px">
        <SearchInput 
          title="Search products by name"
          onTextChanged={onTextChanged}/>      
        <Categories 
          selectedCategoryId={filter.categoryId} 
          onCategoryChanged={onCategoryChanged} />
        <SortSelects />
        <ProductList products={products} />
        <PageNavigation 
          page={filter.page}
          itemsPerPage={filter.itemsPerPage}
          onPageChanged={onPageChanged}
          onItemsPerPageChanged={onItemsPerPageChanged} />
        <ButtonGroup variant="text" aria-label="Basic button group">
          <Button onClick={() => onPriceChanged(10)}>10</Button>
          <Button onClick={() => onPriceChanged(30)}>30</Button>
          <Button onClick={() => onPriceChanged(50)}>50</Button>
          <Button onClick={() => onPriceChanged(100)}>100</Button>
          <Button onClick={() => onPriceChanged(200)}>200</Button>
          <Button onClick={() => onPriceChanged(0)}>Clear</Button>
        </ButtonGroup>
        <PriceRangeSlider 
          start={0}
          end={100}
          minPrice={filter.price_min}
          maxPrice={filter.price_max}
          onPriceRangeChanged={onPriceRangeChanged} />

      </Box>
    </Box>
  )
}
