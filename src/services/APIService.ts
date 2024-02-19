import axios, { AxiosResponse } from 'axios';
import { host, api } from '../utils/urls/Urls';


class ApiService {
  readonly baseURL: string = `${host}/${api}`;
  
  private generateUrl = (fragment: string) => {
    return `${this.baseURL}/${fragment}`;
  }

  public getProduct(categoryId?: number, offset: number = 0, limit: number = 20): Promise<AxiosResponse> {
    let url: string = this.generateUrl("products");
    let separator: string = "/?";

    if (categoryId) {
      url += `${separator}categoryId=${categoryId}`;
      separator = "&";
    }

    url += `${separator}offset=${offset}&limit=${limit}`;
    
    console.log('fetch', url);
    return axios.get(url); 
  }

  public getCategories(): Promise<AxiosResponse> {
    const url: string = this.generateUrl("categories");
    return axios.get(url);
  }

}

export const apiService: ApiService = new ApiService();