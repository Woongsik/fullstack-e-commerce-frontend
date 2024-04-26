import { http, HttpResponse, SetupApi } from "msw";
import { setupServer } from "msw/node";

import { mockCategories } from "./CategoryServer";
import { Product, ProductInfo, ProductsList, ProductUpdate } from "../../misc/types/Product";
import { getUrlAsObject } from "../../misc/utils/Urls";
import { Size } from "../../misc/types/Size";
import { baseUrl } from "./ServerUtil";
import ProductSliceUtils from "../../redux/utils/ProductSliceUtils";
import { Filter } from "../../misc/types/Filter";
import { Category } from "../../misc/types/Category";

export const mockProducts: Product[] = [
  { 
    _id: "product_1", 
    title: "Product 1", 
    sizes: [Size.Large, Size.Small],
    price: 100, 
    description: "Description 1", 
    images: ['http://product_1.png'], 
    category: mockCategories[0],
    createdAt: '2024-03-03T10:58:47.000Z' as any // Date type converted to string
  },
  { 
    _id: "product_2", 
    title: "Product 2", 
    sizes: [Size.OneSize],
    price: 45, 
    description: "Description 2", 
    images: ['http://product_2.png'], 
    category: mockCategories[1],
    createdAt: '2024-03-04T11:58:47.000Z' as any
  },
  { 
    _id: "product_3", 
    title: "Product 3", 
    sizes: [Size.Medium],
    price: 79, 
    description: "Description 3", 
    images: ['http://product_3.png'], 
    category: mockCategories[2],
    createdAt: '2024-03-05T12:58:47.000Z' as any
  }
];

// Only for end point 
// page, itemsPerPage => offset, limit 
type PaginationFilter = Filter & {
  offset: number,
  limit: number
}

export const handler = [
  http.get(`${baseUrl}/api/v1/products`, ({ request }) => { // fetch all products or queries
    let filter: Partial<PaginationFilter> = {};
    if (request.url.indexOf('?') > -1) {
      filter = getUrlAsObject(request.url as string);
    }

    let filteredProducts: Product[] = [...mockProducts];

    if (filter.title) {
      filteredProducts = ProductSliceUtils.filterProductsByTitle(filteredProducts, filter.title);
    }

    const total: number = filteredProducts.length;
    const minMaxPrice = ProductSliceUtils.getMinMaxFromProducts(filteredProducts);
    
    let pagedMockProducts: Product[] = filteredProducts;
    if (filter.offset && filter.limit) {
      pagedMockProducts = ProductSliceUtils.getPagedProducts(filteredProducts, Number(filter.offset + 1), Number(filter.limit));
    }

    const productsList: ProductsList = {
      products: pagedMockProducts,
      total,
      minMaxPrice
    }

    return HttpResponse.json(productsList, { status: 200 });  
  }),
  http.get(`${baseUrl}/api/v1/products/:productId`, ({ params }) => { // fetch a product
    const productId: string = params.productId as string;
    const product: Product | undefined = mockProducts.find((p: Product) => {
      return p._id === productId
    });
    
    if (!product) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(product, { status: 200 });  
  }),
  http.post(`${baseUrl}/api/v1/products`, async ({ request }) => { //register product
    const productInfo = await request.json() as ProductInfo;
    const category: Category | undefined = mockCategories.find((category: Category) => category._id === productInfo.categoryId);

    if (category) {
      const newProduct: Product = {
        ...productInfo,
        category,
        createdAt: new Date().toJSON() as any,
        _id: `product_${mockProducts.length}`
      }
      return HttpResponse.json(newProduct, { status: 200 });  // fetch all products 
    }

    // When no category matched
    return HttpResponse.json(null, { status: 404 });    
  }),
  http.put(`${baseUrl}/api/v1/products/:productId`, async ({ request, params }) => { // update product
    const productId: string = params.productId as string;
    const updateInfo: ProductUpdate = await request.json() as ProductUpdate;
    const matcehdProduct: Product | undefined = mockProducts.find((product: Product) => product._id === productId);
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
  http.delete(`${baseUrl}/api/v1/products/:productId`, async ({ params }) => { // delete product
    const productId: string = String(params.productId);
    const matcehdIndex: number = mockProducts.findIndex((product: Product) => product._id === productId);
    
    if (matcehdIndex > -1) {
      mockProducts.splice(matcehdIndex, 1);
      return HttpResponse.json(null, {status: 204 });    
    }

    // When there is no matched product
    return HttpResponse.json(null, { status: 404 });    
  }),

];

export const productServer = setupServer(...handler);