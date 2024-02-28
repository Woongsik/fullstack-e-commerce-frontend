import axios, { AxiosResponse, Method } from 'axios';

import { host, api } from '../utils/Urls';
import Filter from '../misc/types/Filter';
import { Product, ProductRegister, ProductUpdate } from '../misc/types/Product';
import Category from '../misc/types/Category';
import { LoginUserInfo, RegisterUserInfo, User, UserToken } from '../misc/types/User';
import { userSlicerUtil } from '../redux/utils/UserSlicerUtil';

class ApiService {
  readonly baseURL: string = `${host}/${api}`;
  
  private generateUrl = (fragment: string) => {
    return `${this.baseURL}/${fragment}`;
  }

  public async request<T>(method: Method, url: string, data?: any, headers?: any): Promise<T> {
    const response: AxiosResponse = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });

    return response.data;
  }

  public getProducts(filter: Filter): Promise<Product[]> {
    let url: string = this.generateUrl("products");
    let separator: string = "/?";
    const { title, categoryId, price, price_min, price_max, page, itemsPerPage } = filter;

    if (title) {
      url += `${separator}title=${title}`;
      separator = "&";
    }

    if (categoryId) {
      url += `${separator}categoryId=${categoryId}`;
      separator = "&";
    }

    if (price) {
      url += `${separator}price=${price}`;
      separator = "&";
    }
    
    if (price_min) {
      url += `${separator}price_min=${price_min}`;
      separator = "&";
    }

    if (price_max) {
      url += `${separator}price_max=${price_max}`;
      separator = "&";
    }
    
    // page starated from 1, so need to be 0 
    url += `${separator}offset=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}`;
    
    console.log('fetch', url);
    return this.request<Product[]>('get', url, null); 
  }

  public getProduct(productId: string): Promise<Product> {
    let url: string = this.generateUrl(`products/${productId}`);
    console.log('fetch', url);
    return this.request<Product>('get', url, null); 
  }

  public getCategories(): Promise<Category[]> {
    const url: string = this.generateUrl("categories");
    return this.request<Category[]>('get', url, null); 
  }

  public registerUser(userInfo: RegisterUserInfo): Promise<User> {
    const url: string = this.generateUrl("users/");
    return this.request<User>('post', url, userInfo);
  }

  public loginUser(loginInfo: LoginUserInfo): Promise<UserToken> {
    const url: string = this.generateUrl("auth/login/");
    return this.request<UserToken>('post', url, loginInfo);
  }

  public getUserWithSession(): Promise<User> {
    const url: string = this.generateUrl("auth/profile");
    const tokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    const headers = {
      Authorization : `Bearer ${tokens?.access_token ?? ''}`
    }
    
    return this.request<User>('get', url, null, headers);
  }

  public fetchProductImages(formData: FormData) {
    const url: string = this.generateUrl("files/upload");
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    this.request('post', url, formData, headers).then((response) => {
      console.log('response', response);
    }).catch((e) => {
      console.log('e', e);
    });
  }

  public registerProduct(product: ProductRegister) {
    const url: string = this.generateUrl("products");
    this.request('post', url, product).then((response) => {
      console.log('response', response);
    }).catch((e) => {
      console.log('e', e);
    });
  }

  public updateProduct(product: ProductUpdate) {
    const url: string = this.generateUrl(`products/${product.id}`);
    this.request('put', url, product).then((response) => {
      console.log('response', response);
    }).catch((e) => {
      console.log('e', e);
    });
  }

  public deleteProduct(productId: number): Promise<boolean> {
    const url: string = this.generateUrl(`products/${productId}`);
    return this.request('delete', url);
  }

}

export const apiService: ApiService = new ApiService();