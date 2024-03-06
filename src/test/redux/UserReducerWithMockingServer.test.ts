import { createNewStore } from "../../redux/store";
import { userServer } from "../shared/UserServer";
import { getUserWithSession, loginUser, registerUser } from "../../redux/slices/UserSlice";
import { loginInfo, registerInfo, registeredInfo, userToken } from "./UserReducer.testing";
import { userSlicerUtil } from "../../redux/utils/UserSlicerUtil";
import { UserToken } from "../../misc/types/User";

let store = createNewStore();

beforeAll(() => {
  userServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterAll(() => {
  userServer.close();
});


describe("User reducer with mocking server: register user", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().userReducer.user).toBeNull();
  }); 

  
  test("should get no error if user successfully registered", async () => {
    await store.dispatch(registerUser(registerInfo));
    const { user, error, loading } = store.getState().userReducer;

    expect(user).toBeNull();
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });
});

describe("User reducer with mocking server: login user", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().userReducer.user).toBeNull();
  }); 

  test("should get user token with the login", async () => {
    await store.dispatch(loginUser(loginInfo));
    const { user, error, loading } = store.getState().userReducer;

    expect(user).toBeNull();
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 

    // Check token is saved in localStroage
    const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    expect(savedTokens).toEqual(userToken);
  });
});

  describe("User reducer with mocking server: get user session", () => {
    // check init
    test('should return initial state', () => {
      expect(store.getState().userReducer.user).toBeNull();
    }); 
  
    test("should get user by sending token", async () => {
      // Check token is saved in localStroage
      const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
      expect(savedTokens).toEqual(userToken);

      await store.dispatch(getUserWithSession());
      const { user, error, loading } = store.getState().userReducer;

      expect(user).toEqual(registeredInfo);
      expect(error).toBeUndefined();
      expect(loading).toBeFalsy(); 
    })
  });