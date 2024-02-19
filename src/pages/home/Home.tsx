import { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch, AppState } from '../../redux/store';
import { fetchAllProductsAsync, filterByName } from '../../redux/slices/ProductSlicer';

import SearchInput from '../../components/searchInput/SearchInput';
import ProductList from '../../components/productList/ProductList';
import Categories from '../../components/cateogries/Categories';

import Product from '../../misc/types/Product';

export default function Home() {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ categoryId }));
  }, [categoryId, dispatch]);
  
  const products: Product[] = useSelector((state: AppState) => 
    (searchPhrase && searchPhrase.length > 0) ? 
      state.productReducer.filteredProducts : 
      state.productReducer.products);
  
  const onTextChanged = (text: string) => {
    setSearchPhrase(text);
    dispatch(filterByName(text));
  }

  const onCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId);
  }

  return (
    <Box component="div" display="flex" justifyContent="center" alignItems="center">
      <Box component="div" width="50%" minWidth="500px">
        <SearchInput onTextChanged={onTextChanged}/>      
        <Categories selectedCategoryId={categoryId} onCategoryChange={onCategoryChange}/>
        <ProductList products={products} />
      </Box>
    </Box>
  )
}
