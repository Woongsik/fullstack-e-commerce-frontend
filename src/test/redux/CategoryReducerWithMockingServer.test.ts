// import { createNewStore } from "../../redux/store";
// import { fetchAllCategoriesAsync } from "../../redux/slices/CategorySlice";
// import { categoryServer } from "../shared/CategoryServer";
// import { mockCategories } from "./CategoryReducer.test";

// let store = createNewStore();

// beforeAll(() => {
//   categoryServer.listen();
// });

// beforeEach(() => {
//   store = createNewStore();
// });

// afterAll(() => {
//   categoryServer.close();
// });


// describe("Category reducer with mocking server: fetch all categories", () => {
//   // check init
//   test('should return initial state', () => {
//     expect(store.getState().categoryReducer.categories).toEqual([]);
//   }); 
  
//   test("should get all categories", async () => {
//     await store.dispatch(fetchAllCategoriesAsync());
//     const { categories, error, loading } = store.getState().categoryReducer;

//     expect(categories).toEqual(mockCategories);
//     expect(error).toBeUndefined();
//     expect(loading).toBeFalsy(); 
//   });
// });
export const userReducerWithMockingServer = '';