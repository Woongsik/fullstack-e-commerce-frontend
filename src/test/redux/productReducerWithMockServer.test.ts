import Category from "../../misc/types/Category";
import Filter from "../../misc/types/Filter";
import { productMockServer } from "../shared/ProductServer";
import { Product, ProductRegister, ProductUpdate, ProductUpdateItem } from "../../misc/types/Product";
import { deleteProduct, fetchProduct, fetchProducts, registerProduct, updateProduct } from "../../redux/slices/ProductSlice";
import { createNewStore } from "../../redux/store";
import { mockProducts } from "./ProductsReducer.test";
import { mockCategories } from "./CategoryReducer.test";

let store = createNewStore();

beforeAll(() => {
  productMockServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterAll(() => {
  productMockServer.close();
});


// For the filtering products
const filter: Filter = { page: 2, itemsPerPage: 1 };

describe("Products reducer with mocking server: fetch all product", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  }); 

  test("should get all products", async () => {
    await store.dispatch(fetchProducts({}));

    const { products, error, loading } = store.getState().productReducer;

    expect(products.length).toBe(mockProducts.length);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });

  test("should get a list of products by pagination", async () => {
    await store.dispatch(fetchProducts(filter));
    
    const { products, error, loading } = store.getState().productReducer;

    let pagedMockProducts: Product[] = mockProducts;
    if (filter.page && filter.itemsPerPage) {
      pagedMockProducts = mockProducts.slice((filter.page - 1) * filter.itemsPerPage, filter.page + filter.itemsPerPage);
    }

    expect(products.length).toBe(pagedMockProducts.length);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });

  test("should get a list of products by filter, title='Product 1'", async () => {
    const newFilter = {
      ...filter,
      title: 'Product 1'
    }
    await store.dispatch(fetchProducts(newFilter));
    
    const { products, error, loading } = store.getState().productReducer;

    let filteredByTitleMockProducts: Product[] = mockProducts;
    if (newFilter.title) {
      const title = newFilter.title;
      filteredByTitleMockProducts = mockProducts.filter((p: Product) => p.title.toLowerCase().includes(title.toLowerCase()));
    }

    expect(products.length).toBe(filteredByTitleMockProducts.length);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });
});

describe("Products reducer with mocking server: fetch a product", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });

  const targetProduct: Product = mockProducts[0];
  test("should get 1 product, sending productId", async () => {
    await store.dispatch(fetchProduct(targetProduct.id));
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

  const tobeRegisteredProduct: ProductRegister = {
    title: "Newly registered product",
    price: 1,
    description: "New description",
    images: [],
    categoryId: 2
  };
  
  const category: Category | undefined = mockCategories.find((category: Category) => category.id === Number(tobeRegisteredProduct.categoryId));
  let registeredProuct: Product | null = null;
  if (category) {
    registeredProuct = {
      ...tobeRegisteredProduct,
      creationAt: '',
      updatedAt: '',
      category,
      id: '4'
    }
  }
  
  test("should get the registered product", async () => {
    await store.dispatch(registerProduct(tobeRegisteredProduct));
    const { product, error, loading } = store.getState().productReducer;

    expect(product).toEqual(registeredProuct);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});

describe("Products reducer with mocking server: update a product", () => {
  // Check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  });

  const updateItem: ProductUpdateItem = {
    title: "Product updated",
    price: 100  
  }

  const targetProduct: Product = mockProducts[0];  
  const tobeUpdatedProduct: ProductUpdate = {
    item: updateItem,
    id: targetProduct.id
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

  const targetProduct: Product = mockProducts[mockProducts.length - 1]; 

  test("should get the product as null", async () => {
    await store.dispatch(deleteProduct(targetProduct));
    const { product, error, loading } = store.getState().productReducer;

    expect(product).toBeNull();
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});
