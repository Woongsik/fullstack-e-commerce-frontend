import axios, { AxiosResponse } from 'axios';

import { host, api } from '../utils/Urls';
import Filter from '../misc/types/Filter';


class ApiService {
  readonly baseURL: string = `${host}/${api}`;
  
  private generateUrl = (fragment: string) => {
    return `${this.baseURL}/${fragment}`;
  }

  public getProducts(filter: Filter): Promise<AxiosResponse> {
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
    return axios.get(url); 
  }

  public getProduct(productId: number): Promise<AxiosResponse> {
    let url: string = this.generateUrl(`products/${productId}`);
    console.log('fetch', url);
    return axios.get(url); 
  }

  public getCategories(): Promise<AxiosResponse> {
    const url: string = this.generateUrl("categories");
    return axios.get(url);
  }

}

export const apiService: ApiService = new ApiService();