import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { useAppDispatch } from "../redux/store";
import { fetchAllProductsAsync } from "../redux/slices/ProductSlicer";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ categoryId: 1}));
  }, [dispatch]);

  return { data, loading, error };
}

// const dispatch = useAppDispatch();

// useEffect(() => {
//   dispatch(fetchAllProductsAsync());
// }, [dispatch]);

// let products: Product[] = useSelector((state: AppState) => state.productReducer.products);
// const filteredProducts: Product[] = useSelector((state: AppState) => state.productReducer.filteredProducts);

// if (searchPhrase) {
//   products = filteredProducts;
// }