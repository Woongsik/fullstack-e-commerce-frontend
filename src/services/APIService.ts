import axios, { AxiosResponse } from 'axios';

import { Filter } from '../misc/types/Filter';
import { Product, ProductInfo, ProductsList } from '../misc/types/Product';
import Category from '../misc/types/Category';
import { LoginUserInfo, RegisterUserInfo, User, UserToken } from '../misc/types/User';
import { UploadedImage } from '../misc/types/UploadedImage';
import { GoogleLoginResult } from '../components/ui/googleLogin/GoogleLogin';

// TODO put it to env
const REACT_APP_BASE_URL = 'http://localhost:8080';
const REACT_APP_BASE_URL_FRAGMENT = 'api/v1';

class ApiService {
  readonly baseURL: string = `${REACT_APP_BASE_URL}/${REACT_APP_BASE_URL_FRAGMENT}`;
  
  private generateUrl = (fragment: string) => {
    return `${this.baseURL}/${fragment}`;
  }

  public async request<T>(method: string, url: string, data?: any, headers?: any): Promise<T> {
    /* Use fetch for testing and mocking server with msw
       Please remove comment for testing */
       
    // try { 
    //   const response: Response = await fetch(url, {
    //     method: method,
    //     headers: headers,
    //     body: data ? JSON.stringify(data) : ''
    //   });
      
    //   const jsonResult = await response.json(); 
    //   if (!response.ok) { // error handling
    //     throw Error(jsonResult);
    //   }

    //   return jsonResult;
    // } catch(e) {
    //   const error = e as Error;
    //   throw new Error(error.message);
    // }

    /* Originally used axios
       since msw is not supporting axios */
    const response: AxiosResponse = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });

    return response.data;
  }

  public getProducts(filter: Partial<Filter>): Promise<ProductsList> {
    let url: string = this.generateUrl("products");
    let separator: string = "?";
    const { title, categoryId, min_price, max_price, page, itemsPerPage, 
      sort_created, sort_price, sort_title } = filter;

    if (title) {
      url += `${separator}title=${title}`;
      separator = "&";
    }

    if (categoryId && categoryId !== '0') {
      url += `${separator}categoryId=${categoryId}`;
      separator = "&";
    }
    
    if (min_price) {
      url += `${separator}min_price=${min_price}`;
      separator = "&";
    }

    if (max_price) {
      url += `${separator}max_price=${max_price}`;
      separator = "&";
    }

    if (sort_created) {
      url += `${separator}sort_created=${sort_created}`;
      separator = "&";
    }

    if (sort_price) {
      url += `${separator}sort_price=${sort_price}`;
      separator = "&";
    }

    if (sort_title) {
      url += `${separator}sort_title=${sort_title}`;
      separator = "&";
    }
    
    /* In order to have the toal page correctly,
      page = 0 try to get the whole products 
    */
    if (page && itemsPerPage) {
      // page starated from 1, so need to be 0 
      url += `${separator}offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`;
    }
    
    return this.request<ProductsList>('GET', url); 
  }

  public getProduct(productId: string): Promise<Product> {
    let url: string = this.generateUrl(`products/${productId}`);
    return this.request<Product>('GET', url); 
  }

  public getCategories(): Promise<Category[]> {
    const url: string = this.generateUrl("categories");
    return this.request<Category[]>('GET', url); 
  }

  public registerUser(userInfo: RegisterUserInfo): Promise<User> {
    const url: string = this.generateUrl("users/");
    return this.request<User>('POST', url, userInfo);
  }

  public loginUser(loginInfo: LoginUserInfo): Promise<UserToken> {
    const url: string = this.generateUrl("auth/login/");
    return this.request<UserToken>('post', url, loginInfo);
  }

  public getUserWithSession(tokens: UserToken): Promise<User> {
    const url: string = this.generateUrl("auth/profile");
    const headers = {
      Authorization : `Bearer ${tokens?.access_token ?? ''}`
    }
    
    if (tokens) {
      return this.request<User>('GET', url, undefined, headers);
    }
    return Promise.reject(new Error('User session is not valid'));
  }

  public fetchProductImages(formData: FormData): Promise<UploadedImage> {
    const url: string = this.generateUrl("files/upload");
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    return this.request('POST', url, formData, headers);
  }

  public registerProduct(product: ProductInfo): Promise<Product> {
    const url: string = this.generateUrl("products");
    return this.request('POST', url, product);
  }

  public updateProduct(product: Partial<Product>, productId: string): Promise<Product> {
    const url: string = this.generateUrl(`products/${productId}`);
    return this.request('PUT', url, product);
  }

  public deleteProduct(product: Product): Promise<boolean> {
    const url: string = this.generateUrl(`products/${product._id}`);
    return this.request('DELETE', url);
  }

  public loginWithGoogle(url: string, access_token: string): Promise<GoogleLoginResult> {
    const googleUrl: string = `${url}=${access_token}`;
    return this.request('get', googleUrl);
  }
}

export const apiService: ApiService = new ApiService();
