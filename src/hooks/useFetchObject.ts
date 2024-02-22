// import { useEffect, useState } from "react";

export function useFetchObject<T>() {
  // const [data, setData] = useState<T | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   console.log('Fetch url:', params, ...params);
  //   serviceFunction.then((data: T) => {
  //     setData(data);
  //     setLoading(false);
  //    }).catch((error: string) => {
  //       setError(error);
  //       setLoading(false);
  //   });
    
    // axios
    //   .get(url)
    //   .then((response: AxiosResponse<T>) => {
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error: AxiosError) => {
    //     setError(error.message);
    //     setLoading(false);
    //   });
  // }, [params]);

  // return { data, loading, error };
}
