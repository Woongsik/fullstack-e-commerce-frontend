import Filter from "../../misc/types/Filter";
import { FilteredProducts, Product, ProductRegister } from "../../misc/types/Product";
import { fetchProduct, fetchProducts, registerProduct } from "../../redux/slices/ProductSlice";
import { createNewStore } from "../../redux/store";
import ProductSliceUtils from "../../redux/utils/ProductSliceUtils";
import { productServer } from "../shared/productServer";
import { mockProducts } from "./productsReducer.testing";

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


// For the filtering products
const filter: Filter = { page: 1, itemsPerPage: 10 };

describe("Products reducer with mocking server: fetch all product", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().productReducer.products).toHaveLength(0);
  }); 

  test("should get 2 products by default pagination", async () => {
    await store.dispatch(fetchProducts(filter));
    
    // Sorting/pagination when new products
    const filteredProducts: FilteredProducts = ProductSliceUtils.getTotalAndImageCheckedProducts(mockProducts); 
    const { products, sortedProducts, error, loading } = store.getState().productReducer;

    expect(products.length).toBe(mockProducts.length);
    expect(sortedProducts.length).toBe(filteredProducts.products.length);
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

    expect(product).toBe(targetProduct);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy();
  });
});

// describe("Products reducer with mocking server: register a product", () => {
//   // Check init
//   test('should return initial state', () => {
//     expect(store.getState().productReducer.products).toHaveLength(0);
//   });

//   const tobeRegisteredProduct: ProductRegister = {
//     title: "Newly registered product",
//     price: 1,
//     description: "New description",
//     images: [],
//     categoryId: 1
//   };
  
//   const registeredProuct: Product = {
//     ...mockProducts[0],
//     ...tobeRegisteredProduct  
//   }
  
//   test("should get the registered product", async () => {
//     await store.dispatch(registerProduct(tobeRegisteredProduct));
//     const { product, error, loading } = store.getState().productReducer;

//     expect(product).toBe(registeredProuct);
//     expect(error).toBeUndefined();
//     expect(loading).toBeFalsy();
//   });
// });

//   // when test createNewProduct
//   // id should be omitted since backend will handle
//   // so create new type => here ProductCreate
//   // export type ProductCreate = {
//   //  title, price, description, images, categoryId
//   // }

//   // test("should create new product", async () => {
//   //   const createdProduct: ProductCreate = {
//   //     title: "New test product",
//   //     price: 500,
//   //     description: "New test product",
//   //     images: ['product.png']
//   //   }

//   //   await store.dispatch(createNewProductAsync(createdProduct));
//   //   expect(store.getState().productReducer.products.length).toBe(5);
//   // });

//   // should return inital state (no proudcts)
//   // if test previously with store,
//   // still some values can be remained from previous test
//   // This means that we need to clean up after every test
//   // createNewStore
//   test('should return initial state', () => {
//     expect(store.getState().productReducer.products).toHaveLength(0);
//   });


//   //RTK query test
//   test('should fetch all product with RTK query', () => {
//     //await store.dispatch(productQueries.endpoints.fetchAllProducts.initiate());
//     //expect(store.getState().prodcutApi.queries['fetchAllProducts(undefined)'].data).toHavelength(2);
//   });
// });

