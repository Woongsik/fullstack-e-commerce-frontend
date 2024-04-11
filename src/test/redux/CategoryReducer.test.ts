// import Category from "../../misc/types/Category";
// import categoryReducer, { fetchAllCategoriesAsync, initialState, InitialState } from "../../redux/slices/CategorySlice";

// export const mockCategories: Category[] = [
//   {
//     id: 1,
//     name: 'Category1',
//     image: '',
//     creationAt: '',
//     updatedAt: ''
//   },
//   {
//     id: 2,
//     name: 'Category2',
//     image: '',
//     creationAt: '',
//     updatedAt: ''
//   },
//   {
//     id: 3,
//     name: 'Category3',
//     image: '',
//     creationAt: '',
//     updatedAt: ''
//   },
// ] 

// describe("Category reducer: fetchAllCategoriesAsync", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = categoryReducer(undefined, { type: ""});
//     expect(state).toEqual(initialState);
//   });

//   // test: fetchAllCategoriesAsync.fulfilled
//   test("should return a list of categories", () => {
//     const state: InitialState = categoryReducer(
//       initialState,
//       fetchAllCategoriesAsync.fulfilled(mockCategories, "fetchAllCategoriesAsync")
//     );

//     expect(state).toEqual({
//       categories: mockCategories,
//       loading: false
//     });
//   });

//   // test: fetchAllCategoriesAsync.pending
//   test("should have loading truthy when it is pending", () => {
//     const state: InitialState = categoryReducer(
//       initialState,
//       fetchAllCategoriesAsync.pending("fetchAllCategoriesAsync")
//     );

//     expect(state).toEqual({
//       categories: [],
//       loading: true
//     });
//   });

//   // test: fetchAllCategoriesAsync.rejected
//   test("should have an error", () => {
//     const error: Error = new Error('error'); 
//     const state: InitialState = categoryReducer(
//       initialState,
//       fetchAllCategoriesAsync.rejected(error, "fetchAllCategoriesAsync")
//     );

//     expect(state).toEqual({
//       categories: [],
//       loading: false,
//       error: error.message
//     });
//   });
// });

export const userReducerWithMockingServer = '';