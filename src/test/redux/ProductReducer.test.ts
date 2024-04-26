import { Category } from "../../misc/types/Category";
import { Filter } from "../../misc/types/Filter";
import { Product, ProductInfo, ProductUpdate } from "../../misc/types/Product";
import { Size } from "../../misc/types/Size";
import { deleteProduct, fetchProduct, fetchProducts, initialState, registerProduct, updateProduct } from "../../redux/slices/ProductSlice";
import { createNewStore } from "../../redux/store";
import ProductSliceUtils from "../../redux/utils/ProductSliceUtils";
import { mockCategories } from "../shared/CategoryServer";

const productServer = require('../shared/ProductServer');
const mockProducts = productServer.mockProducts;

let store = createNewStore();

beforeAll(() => {
  productServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterAll(() => {
  productServer.close();
});

const filter: Partial<Filter> = {
  page: 1,
  itemsPerPage: 1
}

describe("Products reducer with mocking server: fetch all product", () => {
  // check init
  test('should return initial state', () => {
    const productState = store.getState().productReducer;
    expect(productState).toEqual(initialState);    
  }); 

  test("should get all products", async () => {
    await store.dispatch(fetchProducts({}));
    const { products, minMaxPrice, total, error, loading } = store.getState().productReducer;

    const expectedTotal: number = mockProducts.length;
    const expectedMinMaxPrice = ProductSliceUtils.getMinMaxFromProducts(mockProducts);
    
    expect(mockProducts.length).toBe(products.length);
    expect(expectedTotal).toBe(total);
    expect(expectedMinMaxPrice).toEqual(minMaxPrice);

    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });

  test("should get a list of products by pagination", async () => {
    await store.dispatch(fetchProducts(filter));
    
    const { products, minMaxPrice, total, error, loading } = store.getState().productReducer;

    let pagedMockProducts: Product[] = mockProducts;
    if (filter.page && filter.itemsPerPage) {
      pagedMockProducts = ProductSliceUtils.getPagedProducts(mockProducts, filter.page, filter.itemsPerPage);
    }

    const expectedTotal: number = mockProducts.length;
    const expectedMinMaxPrice = ProductSliceUtils.getMinMaxFromProducts(mockProducts);
    
    expect(products.length).toBe(pagedMockProducts.length);
    expect(expectedTotal).toBe(total);
    expect(expectedMinMaxPrice).toEqual(minMaxPrice);

    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });

  test("should get a list of products by filter, title='Product 1'", async () => {
    const newFilter: Partial<Filter> = {
      ...filter,
      title: 'Product 1'
    }
    await store.dispatch(fetchProducts(newFilter));
    
    const { products, error, loading } = store.getState().productReducer;

    let filteredProducts: Product[] = [...mockProducts];
    if (newFilter.title) {
      filteredProducts = ProductSliceUtils.filterProductsByTitle(filteredProducts, newFilter.title);
    }

    expect(products.length).toBe(filteredProducts.length);
    expect(products).toEqual(filteredProducts);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });
});

describe("Products reducer with mocking server: fetch a product", () => {
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });

  const targetProduct: Product = mockProducts[0];
  
  test("should get 1 product, sending productId", async () => {
    await store.dispatch(fetchProduct(targetProduct._id));
    const { product, error, loading } = store.getState().productReducer;

    expect(product).toEqual(targetProduct);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});

describe("Products reducer with mocking server: register a product", () => {
  // Check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });
  
  test("should get the registered product", async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-04-21'));

    const productInfo: ProductInfo = {
      title: "New product",
      sizes: [Size.Medium], 
      price: 150,
      description: "New product description",
      images: ['http://newProduct.png'],
      categoryId: 'category_2'
    };

    await store.dispatch(registerProduct(productInfo));
    const { product, error, loading } = store.getState().productReducer;

    const category: Category | undefined = mockCategories.find((category: Category) => category._id === productInfo.categoryId);
    let newProduct: Product | undefined;
    if (category) {
      newProduct = {
        ...productInfo,
        category,
        createdAt: new Date().toJSON() as any,
        _id: `product_${mockProducts.length}`
      }
    };
    
    expect(newProduct).toEqual(product);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});

describe("Products reducer with mocking server: update a product", () => {
  // Check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });

  const updateItem: Partial<ProductInfo> = {
    title: "Updated product",
    price: 100  
  }

  const targetProduct: Product = mockProducts[0];  
  const tobeUpdatedProduct: ProductUpdate = {
    item: updateItem,
    _id: targetProduct._id
  };

  const updatedProduct: Product = {
    ...targetProduct,
    ...updateItem
  }
  
  test("should get the updated product", async () => {
    await store.dispatch(updateProduct(tobeUpdatedProduct));
    const { product, error, loading } = store.getState().productReducer;

    expect(product).toEqual(updatedProduct);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});

describe("Products reducer with mocking server: delete a product", () => {
  // Check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });

  test("should get the product as null", async () => {
    const targetProduct: Product = mockProducts[mockProducts.length - 1]; 

    await store.dispatch(deleteProduct(targetProduct._id));
    const { product, error, loading } = store.getState().productReducer;

    expect(product).toBeNull();
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});