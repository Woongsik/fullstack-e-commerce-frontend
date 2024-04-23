import { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import CenteredContainer from '../../../../../ui/layout/CenteredContainer';
import LoadingAndMessage from '../../../../../ui/loadingAndMessage/LoadingAndMessage';
import { Product, ProductsList } from '../../../../../../misc/types/Product';
import ProductDetailsRow from './productDetail/ProductDetailsRow';
import { apiService } from '../../../../../../services/APIService';

export default function AllProducts() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {      
      setLoading(true);
      const productList: ProductsList = await apiService.getProducts({});
      setProducts(productList.products);
    } catch (e) {
      const error = e as Error;
      setError(`Cannot get products, ${error.message}`);
    }
    
    setLoading(false);
  }

  const handleProductDeleted = (productId: string) => {
    const clonedProducts = [...products];
    const index: number = clonedProducts.findIndex((clonedProject: Product) => clonedProject._id === productId);
    if (index > -1) {
      clonedProducts.splice(index, 1);
    }

    setProducts(clonedProducts);
  }

  const handleProductUpdated = (product: Product) => {
    const clonedProducts = [...products];
    const index: number = clonedProducts.findIndex((clonedProject: Product) => clonedProject._id === product._id);
    if (index > -1) {
      clonedProducts.splice(index, 1, product);
    }

    setProducts(clonedProducts);
  }

  return (
  <CenteredContainer width='100%' sx={{ minWidth: '300px' }}>
    {(products && products.length > 0) &&
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <ProductDetailsRow 
                key={product._id} 
                product={product}
                onProductDeleted={handleProductDeleted}
                onProductUpdated={handleProductUpdated} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    {(!loading && products && products.length === 0) &&  <h3>No Products yet...</h3>}

    <LoadingAndMessage loading={loading} error={error} />
  </CenteredContainer>  )
}
