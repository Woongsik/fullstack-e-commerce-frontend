import Product from "../../misc/types/Product";
import productReducer, { fetchProducts } from "../../redux/slices/ProductSlicer";
import store from "../../redux/store";
import { productServer } from "../shared/productServer";

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.listen();
});

const initialState = {
  products: [] as Product[],
  filteredProducts: [] as Product[],
  loading: false as boolean,
  error: undefined as string | undefined
};

// // test suit
describe("prouct reducer", () => {
//   // 3 tests

//   // mock data
//   let mockProducts: Product[] = [
//     { id: "1", 
//     title: "product1", 
//     price: 1, 
//     description: "", 
//     images: [], 
//     updatedAt: "", 
//     creationAt: "",
//     category: {
//       id: 1,
//       name: "",
//       image: "",
//       creationAt: "",
//       updatedAt: ""
//     }},
//   ];

//   // test: inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test1: fullfill
//   test("should return a list of products", () => {
//     // not test feetchAllProductsAsync
//     // test reducer
//     const state = productReducer(
//       initialState,
//       fetchAllProductsAsync.fulfilled(mockProducts, 'fulfiiled' )
//     );

//     expect(state).toEqual({
//       products: mockProducts,
//       loading: false,
//       error: undefined
//     });
//   });

//   // test2: pending
//   test("should have loading truthy when tech is pending", () => {
//     const state = productReducer(
//       initialState,
//       fetchAllProductsAsync.pending("pending")
//     );

//     expect(state).toEqual({
//       products: [],
//       loading: true,
//       error: undefined
//     });
//   }); 
  
//   // test3: reject
//   test("should have error", () => {
//     // error: Error
//     const error = new Error('error'); 

//     const state = productReducer(
//       initialState,
//       // fetchAllProductsAsync.rejected(error, "error")
//     );

//     expect(state).toEqual({
//       products: [],
//       loading: true,
//       error: error.message
//     });
//   });



  // Other style from Alia
  // handy , shorter
  // shortage : it is not rely on mock data
  // so the data is not stable
  // also should be independent from backend as well
  test("should fetch all products from api", async () => {
    await store.dispatch(fetchProducts({ page: 0, itemsPerPage: 10 }));
    expect(store.getState().productReducer.products.length).toBe(10);
    expect(store.getState().productReducer.error).toBeNull();
  });

  // when test createNewProduct
  // id should be omitted since backend will handle
  // so create new type => here ProductCreate
  // export type ProductCreate = {
  //  title, price, description, images, categoryId
  // }

  // test("should create new product", async () => {
  //   const createdProduct: ProductCreate = {
  //     title: "New test product",
  //     price: 500,
  //     description: "New test product",
  //     images: ['product.png']
  //   }

  //   await store.dispatch(createNewProductAsync(createdProduct));
  //   expect(store.getState().productReducer.products.length).toBe(5);
  // });
});

