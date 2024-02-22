import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export function useFetchArray<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log('Fetch url:', url);
    axios
      .get(url)
      .then((response: AxiosResponse<T[]>) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
