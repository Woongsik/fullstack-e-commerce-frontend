import axios, { AxiosResponse } from 'axios';

import { Filter } from '../misc/types/Filter';
import { Product, ProductInfo, ProductsList } from '../misc/types/Product';
import { Category, CategoryBase } from '../misc/types/Category';
import { LoggedUserInfo, LoginInfo, PasswordUpdate, RegisterUserInfo, User, UserForgetPassword, UserRoleAndActive, UserToken } from '../misc/types/User';
import { localStorageUtil } from '../redux/utils/LocalStrorageUtil';
import { StripeSecret } from '../misc/types/StripeSecret';
import { Order, OrderRegistesr } from '../misc/types/Order';

class ApiService {
  readonly baseURL: string = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_BASE_URL_FRAGMENT}`;
  private generateUrl = (fragment: string) => {
    return `${this.baseURL}/${fragment}`;
  }

  private getAccessToken = (): {} => {
    const authHeader: any = {};
    const tokens: UserToken | null = localStorageUtil.getTokens();
    if (tokens && tokens.accessToken) {
      authHeader.Authorization = `Bearer ${tokens.accessToken}`
    }

    return authHeader;
  }

  public async request<T>(method: string, url: string, data?: any, headers?: any): Promise<T> {
    const testMode: boolean = process.env.NODE_ENV === 'test'; // Automatically set to true when npm test for testing with msw
    
    if (testMode) {
      try {
        const accessToken: {} = this.getAccessToken();
        const response: Response = await fetch(url, {
          method: method,
          headers: {
            ...headers,
            ...accessToken
          },
          body: data ? JSON.stringify(data) : undefined
        });

        if (!response.ok) { // error handling
          const responseText: any = await response.text();
          const message = JSON.parse(JSON.stringify(responseText));
          throw Error(message.message);
        }

        const jsonResult = await response.json(); 
        return jsonResult;
      } catch(e) {
        const error = e as Error;
        throw new Error(error.message);
      }
    } else {
      try {
        const accessToken: {} = this.getAccessToken();
        const response: AxiosResponse = await axios({
          method: method,
          url: url,
          data: data,
          headers: {
            ...accessToken
          }
        });
        
        return response.data;
       } catch (e) {
        throw new Error((e as any).response.data.message);
       }
    }     
  }

  public getProducts(filter: Partial<Filter>): Promise<ProductsList> {
    let url: string = this.generateUrl("products");
    let separator: string = "?";
    const { title, categoryId, min_price, max_price, page, itemsPerPage, 
      size, sort_created, sort_price, sort_title } = filter;

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

    if (size) {
      url += `${separator}size=${size}`;
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

  public registerCategory(categoryInfo: CategoryBase): Promise<Category> {
    const url: string = this.generateUrl("categories");
    return this.request<Category>('POST', url, categoryInfo); 
  }

  public updateCategory(categoryId: string, categoryInfo: CategoryBase): Promise<Category> {
    const url: string = this.generateUrl(`categories/${categoryId}`);
    return this.request<Category>('PUT', url, categoryInfo); 
  }

  public deleteCategory(categoryId: string): Promise<void> {
    const url: string = this.generateUrl(`categories/${categoryId}`);
    return this.request<void>('DELETE', url); 
  }

  public registerUser(userInfo: RegisterUserInfo): Promise<User> {
    const url: string = this.generateUrl("users/");
    return this.request<User>('POST', url, userInfo);
  }

  public updateUser(userInfo: Partial<RegisterUserInfo>): Promise<User> {
    const url: string = this.generateUrl('users/');
    return this.request<User>('PUT', url, userInfo);
  }

  public updateUserPassword(passwordInfo: PasswordUpdate): Promise<User> {
    const url: string = this.generateUrl('users/update-password');
    return this.request<User>('PUT', url, passwordInfo);
  }

  public login(loginInfo: LoginInfo): Promise<LoggedUserInfo> {
    const url: string = this.generateUrl("users/login");
    return this.request<LoggedUserInfo>('POST', url, loginInfo);
  }

  public getUserWithSession(): Promise<User> {
    const url: string = this.generateUrl("users/session");
    return this.request<User>('GET', url);
  }

  public uploadImage(formData: FormData): Promise<string> {
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

  public deleteProduct(productId: string): Promise<boolean> {
    const url: string = this.generateUrl(`products/${productId}`);
    return this.request('DELETE', url);
  }

  public loginWithGoogle(credential: string): Promise<LoggedUserInfo> {
    const url: string = this.generateUrl('users/google-login');
    return this.request('POST', url, {
      id_token:  credential
    });
  }

  public getStripeClient(totalAmount: number): Promise<StripeSecret> {
    const url: string = this.generateUrl('orders/stripe');
    return this.request('POST', url, {
      totalAmount
    });
  }

  public registerOrder(orderInfo: OrderRegistesr): Promise<Order> {
    const url: string = this.generateUrl('orders');
    return this.request('POST', url, orderInfo);
  }

  public getOrders(): Promise<Order[]> {
    const url: string = this.generateUrl('orders');
    return this.request('GET', url);
  }

  public getUsers(): Promise<User[]> {
    const url: string = this.generateUrl('users');
    return this.request('GET', url);
  }

  public updateUserRoleAndActive(userId: string, updateInfo: UserRoleAndActive): Promise<User> {
    const url: string = this.generateUrl(`admin/${userId}`);
    return this.request('POST', url, updateInfo);
  }

  public deleteUser(userId: string): Promise<void> {
    const url: string = this.generateUrl(`users/${userId}`);
    return this.request('DELETE', url);
  }

  public forgetPassword(userInfo: UserForgetPassword): Promise<void> {
    const url: string = this.generateUrl(`users/forget-password`);
    return this.request('POST', url, userInfo);
  }
}

export const apiService: ApiService = new ApiService();
