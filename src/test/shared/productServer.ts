// mswjs.io
// mocking the server
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockCategories, mockProducts } from "../redux/ProductsReducer.testing";
import { Product, ProductRegister, ProductUpdateItem } from "../../misc/types/Product";
import Category from "../../misc/types/Category";
import { getUrlAsObject } from "../../utils/Urls";

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/products', ({ request }) => { // fetch all products or queries
    const url: string = String(request.url);
    let response: Product[] = mockProducts;
    if (request.url.includes('products/?')) { // when there is a query 
      const urlObj: Object = getUrlAsObject(url);
      if ('title' in urlObj) {
        const title: string = String(urlObj.title);
        response = response.filter((p: Product) => p.title.toLowerCase().includes(title.toLowerCase()));
      }
  
      if ('offset' in urlObj && 'limit' in urlObj) {
        const offset = Number(urlObj.offset);
        const limit = Number(urlObj.limit);
        response = response.slice((offset - 1) * limit, offset + limit);
      }
    }
    return HttpResponse.json(response, { status: 200 });  
  }),
  http.get('https://api.escuelajs.co/api/v1/products/:id', ({ params }) => { // fetch a product
    const productId = String(params.id);
    const product = mockProducts.find((product: Product) => {
      return product.id === productId
    });
    
    if (!product) {
      return HttpResponse.json(null, { status: 404 });
    }
    return HttpResponse.json(product, { status: 200 });  
  }),
  http.post('https://api.escuelajs.co/api/v1/products', async ({ request }) => { //register product
    const registerInfo = await request.json() as ProductRegister;
    const category: Category | undefined = mockCategories.find((category: Category) => category.id === Number(registerInfo.categoryId));

    if (category) {
      const newProduct: Product = {
        ...registerInfo,
        creationAt: '',
        updatedAt: '',
        category,
        id: '4' // backend assign the id
      }
      return HttpResponse.json(newProduct, { status: 200 });  // fetch all products 
    }
    // When no category matched
    return HttpResponse.json(null, { status: 404 });    
  }),
  http.put('https://api.escuelajs.co/api/v1/products/:id', async ({ request, params }) => { // update product
    const productId: string = String(params.id);
    const updateInfo = await request.json() as ProductUpdateItem;
    const matcehdProduct: Product | undefined = mockProducts.find((product: Product) => product.id === productId);
    if (matcehdProduct) {
      const updatedProduct: Product = {
        ...matcehdProduct,
        ...updateInfo
      }
      return HttpResponse.json(updatedProduct, { status: 200 });
    }
    // When no product matched
    return HttpResponse.json(null, {status: 404 });    
  }),
  http.delete('https://api.escuelajs.co/api/v1/products/:id', async ({ params }) => { // delete product
    const productId: string = String(params.id);
    const matcehdIndex: number = mockProducts.findIndex((product: Product) => product.id === productId);
    
    if (matcehdIndex > -1) {
      mockProducts.splice(matcehdIndex, 1);
    }

    // even if no matched product, return true
    return HttpResponse.json(true, {status: 200 });    
  }),

];

export const productServer = setupServer(...handler);