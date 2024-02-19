import Product from "../../misc/types/Product";
import productReducer, { fetchAllProductsAsync } from "../../redux/slices/ProductSlicer";

const initialState = {
  products: [] as Product[],
  filteredProducts: [] as Product[],
  loading: false as boolean,
  error: undefined as string | undefined
};

// // test suit
// describe("prouct reducer", () => {
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
// });

