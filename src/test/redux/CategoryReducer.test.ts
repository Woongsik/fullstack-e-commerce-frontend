import { createNewStore } from "../../redux/store";
import { fetchAllCategoriesAsync, initialState } from "../../redux/slices/CategorySlice";
import { categoryServer } from "../shared/CategoryServer";
import { Category, CategoryBase } from "../../misc/types/Category";
import { apiService } from "../../services/APIService";
import { mockCategories } from "../shared/CategoryServer";

let store = createNewStore();

beforeAll(() => {
  categoryServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterAll(() => {
  categoryServer.close();
});

describe("Category reducer with mocking server: fetch all categories", () => {
  // check init
  test('should return initial state', () => {
    const categoryState = store.getState().categoryReducer;
    expect(categoryState).toEqual(initialState);
  }); 
  
  test("should get all categories", async () => {
    await store.dispatch(fetchAllCategoriesAsync());
    const { categories, error, loading } = store.getState().categoryReducer;

    expect(categories).toEqual(mockCategories);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });

  test("should create a new category", async () => {
    const categoryInfo: CategoryBase = {
      title: 'new category',
      image: 'http://newcategry.png'
    }

    const newCategory: Category = await apiService.registerCategory(categoryInfo);
    const exprectedNewCategory: Category = {
      ...categoryInfo,
      _id: `category_${mockCategories.length}`

    }

    expect(newCategory).toEqual(exprectedNewCategory);
  });

  test("should update the category with id, updateInfo", async () => {
    const categoryToUpdate: Category = mockCategories[0];
    const categoryInfo: CategoryBase = {
      title: categoryToUpdate.title,
      image: 'http://updatedcategory.png'
    }
    const expectedCategory: Category = {
      ...categoryToUpdate,
      ...categoryInfo
    }
    
    const updatedCategory: Category = await apiService.updateCategory(categoryToUpdate._id, categoryInfo);
    expect(updatedCategory).toEqual(expectedCategory);
  });

  test("should remove the category by id", async () => {
    const selectedIndex: number = 0;
    const categoryToRemove: Category = mockCategories[selectedIndex];
    const clonedMock = [...mockCategories];
    clonedMock.splice(selectedIndex, 1);

    //Remove 
    await apiService.deleteCategory(categoryToRemove._id);

    // Chcek all categories
    const allCategoires = await apiService.getCategories();
    expect(clonedMock.length).toEqual(allCategoires.length);
  });
});