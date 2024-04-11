// import Filter from "../../misc/types/Filter";
// import { FilteredProducts, Product, ProductRegister, ProductUpdate, ProductUpdateItem } from "../../misc/types/Product";
// import Sort from "../../misc/types/Sort";
// import productReducer, { initialState, InitialState, deleteProduct, fetchProduct, fetchProducts, registerProduct, sortBy, updateFilter, updateProduct } from "../../redux/slices/ProductSlice";
// import ProductSliceUtils from "../../redux/utils/ProductSliceUtils";
// import Category from "../../misc/types/Category";

// // mock data
// export const mockProducts: Product[] = [
//   { 
//     id: "1", 
//     title: "Product 1", 
//     price: 1, 
//     description: "Description 1", 
//     images: [], 
//     updatedAt: "2024-03-04T11:58:47.000Z", 
//     creationAt: "2024-03-04T11:58:47.000Z",
//     category: {
//       id: 1,
//       name: "Category 1",
//       image: "",
//       creationAt: "",
//       updatedAt: ""
//     }
//   },
//   { 
//     id: "2", 
//     title: "Product 2", 
//     price: 2, 
//     description: "Description 2", 
//     images: [], 
//     updatedAt: "2024-03-03T10:58:47.000Z", 
//     creationAt: "2024-03-03T10:58:47.000Z",
//     category: {
//       id: 2,
//       name: "Category 2",
//       image: "",
//       creationAt: "",
//       updatedAt: ""
//     }
//   },
//   { 
//     id: "3", 
//     title: "Product 3", 
//     price: 2, 
//     description: "Description 3", 
//     images: [], 
//     updatedAt: "2024-03-01T10:58:47.000Z", 
//     creationAt: "2024-03-01T10:58:47.000Z",
//     category: {
//       id: 3,
//       name: "Category 3",
//       image: "",
//       creationAt: "",
//       updatedAt: ""
//     }
//   },
// ];

// const mockCategories: Category[] = [
//   {
//     id: 1,
//     name: "Category 1",
//     image: "",
//     creationAt: "",
//     updatedAt: ""
//   },
//   {
//     id: 2,
//     name: "Category 2",
//     image: "",
//     creationAt: "",
//     updatedAt: ""
//   },
//   {
//     id: 3,
//     name: "Category 3",
//     image: "",
//     creationAt: "",
//     updatedAt: ""
//   }
// ]

// const filter: Filter = { page: 1, itemsPerPage: 10 };

// describe("Products reducer: update Filter", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test: update filter
//   test("should return a filter by user selection", () => {
//     // test reducer
//     const userInput: string = "duct 2";
//     const newFilter: Filter = {
//       ...filter,
//       title: userInput
//     };

//     const state: InitialState = productReducer(
//       { ...initialState,
//         products: mockProducts,
//         sortedProducts: mockProducts
//       },
//       updateFilter(newFilter)
//     );

//     expect(state).toEqual({ // filtering is done by api, just update filter value
//       loading: false,
//       product: null,
//       products: mockProducts,
//       sortedProducts: mockProducts,
//       filter: newFilter,
//       total: 0,
//       minMaxPrice: []
//     });
//   });
// });

// describe("Products reducer: sort by", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test: sort products by createdAt
//   test("should return a list of sorted products by LATEST_CREATED", () => {
//     // test reducer
//     const sort: Sort = Sort.LATEST_CREATED;
//     const state: InitialState = productReducer(
//       { ...initialState,
//         products: mockProducts
//       },
//       sortBy(sort)
//     );

//     expect(state).toEqual({
//       loading: false,
//       product: null,
//       products: mockProducts,
//       sort: sort,
//       total: 0,
//       minMaxPrice: [],
//       sortedProducts: ProductSliceUtils.sortProducts(mockProducts, sort)
//     });
//   });
// });

// describe("Products reducer: fetchProducts", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test: fetchProducts.fullfilled
//   test("should return a list of products", () => {
//     // test reducer
//     const state: InitialState = productReducer(
//       {...initialState,
//         filter: filter
//       }, // filter updated when fetchProducts
//       fetchProducts.fulfilled(mockProducts, 'fetchProducts', filter)
//     );

//     const filteredProducts: FilteredProducts = ProductSliceUtils.getTotalAndImageCheckedProducts(mockProducts, state.filter, state.total, state.minMaxPrice);
//     expect(state).toEqual({
//       products: mockProducts,
//       sortedProducts:  ProductSliceUtils.sortProducts(filteredProducts.products, state.sort),
//       filter: filter,
//       product: null,
//       total: filteredProducts.total,
//       minMaxPrice: filteredProducts.minMaxPrice,
//       loading: false     
//     });
//   });

//   // test: fetchProducts.pending
//   test("should have loading truthy when it is pending", () => {
//     const state = productReducer(
//       initialState,
//       fetchProducts.pending('fetchProducts', filter)
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       product: null,
//       total: 0,
//       minMaxPrice: [],
//       loading: true    
//     });
//   });

//   // test: fetchProducts.reject
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state = productReducer(
//       initialState,
//       fetchProducts.rejected(error, 'fetchProducts', filter)
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       product: null,
//       total: 0,
//       minMaxPrice: [],
//       loading: false,
//       error: error.message 
//     });
//   });

// });

// describe("Products reducer: fetchProduct", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test: fetchProduct.fullfilled
//   test("should return a product", () => {
//     const mockProduct: Product = mockProducts[0];
//     const state: InitialState = productReducer(
//       initialState,
//       fetchProduct.fulfilled(mockProduct, 'fetchProduct', "fullfilled")
//     );

//     const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(mockProduct);
//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: imageCheckedProduct,
//       loading: false     
//     });
//   });

//   // test: fetchProducts.pending
//   test("should have loading truthy when it is pending", () => {
//     const state = productReducer(
//       initialState,
//       fetchProduct.pending('fetchProduct', 'pending')
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: true    
//     });
//   });

//   // test: fetchProduct.reject
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state = productReducer(
//       initialState,
//       fetchProduct.rejected(error, 'fetchProduct', 'rejected')
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: false,
//       error: error.message 
//     });
//   });



// });

// describe("Products reducer: registerProduct", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
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

//   // test: registerProduct.fullfilled
//   test("should return a registered product", () => {
//     const state: InitialState = productReducer(
//       initialState,
//       registerProduct.fulfilled(registeredProuct, 'registerProduct', tobeRegisteredProduct, "fulfilled")
//     );

//     const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(registeredProuct);
//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: imageCheckedProduct,
//       loading: false     
//     });
//   });

//   // test: registerProduct.pending
//   test("should have loading truthy when it is pending", () => {
//     const state = productReducer(
//       initialState,
//       registerProduct.pending('udpateProduct', tobeRegisteredProduct, "pending")
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: true    
//     });
//   });

//   // test: registerProduct.reject
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state = productReducer(
//       initialState,
//       registerProduct.rejected(error, 'registerProduct', tobeRegisteredProduct, 'rejected')
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: false,
//       error: error.message 
//     });
//   });
// });

// describe("Products reducer: updateProduct", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   const tobeUpdatedProductItem: ProductUpdateItem = {
//     title: "Product updated"    
//   }

//   const tobeUpdatedProduct: ProductUpdate = {
//     item: tobeUpdatedProductItem,
//     id: "1"
//   };

//   const updatedProduct: Product = {
//     ...mockProducts[0],
//     ...tobeUpdatedProductItem
//   }

//   // test: updateProduct.fullfilled
//   test("should return a updated product", () => {
//     const state: InitialState = productReducer(
//       initialState,
//       updateProduct.fulfilled(updatedProduct, 'updateProduct', tobeUpdatedProduct, "fulfilled")
//     );

//     const imageCheckedProduct: Product = ProductSliceUtils.checkImagesForProduct(updatedProduct);
//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: imageCheckedProduct,
//       loading: false     
//     });
//   });

//   // test: udpateProduct.pending
//   test("should have loading truthy when it is pending", () => {
//     const state = productReducer(
//       initialState,
//       updateProduct.pending('udpateProduct', tobeUpdatedProduct, "pending")
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: true    
//     });
//   });

//   // test: udpateProduct.reject
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state = productReducer(
//       initialState,
//       updateProduct.rejected(error, 'udpateProduct', tobeUpdatedProduct, 'rejected')
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: false,
//       error: error.message 
//     });
//   });
// });

// describe("Products reducer: deleteProduct", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = productReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   const tobeDeletedProduct: Product = mockProducts[0];

//   // test: registerProduct.fullfilled
//   test("should return a boolean by deleting a product and make product null", () => {
//     const state: InitialState = productReducer(
//       initialState,
//       deleteProduct.fulfilled(true, 'deleteProduct', tobeDeletedProduct, "fulfilled")
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: false     
//     });
//   });

//   // test: deleteProduct.pending
//   test("should have loading truthy when it is pending", () => {
//     const state = productReducer(
//       initialState,
//       deleteProduct.pending('deleteProduct', tobeDeletedProduct, "pending")
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: true    
//     });
//   });

//   // test: deleteProduct.reject
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state = productReducer(
//       initialState,
//       deleteProduct.rejected(error, 'deleteProduct', tobeDeletedProduct, 'rejected')
//     );

//     expect(state).toEqual({
//       products: [],
//       sortedProducts: [],
//       total: 0,
//       minMaxPrice: [],
//       product: null,
//       loading: false,
//       error: error.message 
//     });
//   });
// });
export const userReducerWithMockingServer = '';