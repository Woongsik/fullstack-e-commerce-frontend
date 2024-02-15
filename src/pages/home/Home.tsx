import { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../redux/store';
import { fetchAllProductsAsync } from '../../redux/slices/ProductSlicer';
import { Product } from '../../misc/types/Product';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const products: Product[] = useSelector((state: AppState) => state.productReducer.products);

  return (
    <div>
      {products.map((product: Product) => <div key={product.id}>{product.title}</div>)}
      {/* <button onClick={handleClick}>Plus</button> */}
    </div>
  )
}
