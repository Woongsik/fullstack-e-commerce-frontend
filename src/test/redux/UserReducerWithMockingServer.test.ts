import { createNewStore } from "../../redux/store";
import { userServer, userToken } from "../shared/UserServer";
import { getUserWithSession, initialState, loginUser, registerUser, updateUser, updateUserPassword } from "../../redux/slices/UserSlice";
import { userSlicerUtil } from "../../redux/utils/UserSlicerUtil";
import { LoginInfo, PasswordUpdate, RegisterUserInfo, User, UserRole, UserToken } from "../../misc/types/User";

export let store = createNewStore();

beforeAll(() => {
  userServer.listen();
});

beforeEach(() => {
  store = createNewStore();
});

afterAll(() => {
  userServer.close();
});

export const loginInfo: LoginInfo = {
  email: 'customer@mail.com',
  password: 'userPassword'
}

export const adminInfo: RegisterUserInfo = {
  ...loginInfo,
  firstname: 'firstname',
  lastname: 'lastname',
  username: 'username',
  address: 'somewhere in Helsinki, 00100, Finland',
  avatar: 'http://user.png',
  email: 'admin@mail.com'
}

export const customerInfo: RegisterUserInfo = {
  ...adminInfo,
  email: 'customer@mail.com'
}

describe("User reducer with mocking server: Create user", () => {
  // check init
  test('should return initial state', () => {
    const userState = store.getState().userReducer;
    expect(userState).toEqual(initialState);
  }); 

  
  test("should get no error if user successfully registered", async () => {
    // Create a Admin
    const responseForAdmin = await store.dispatch(registerUser(adminInfo));
    const newAdmin: User = responseForAdmin.payload as User;

    expect(newAdmin.role).toBe(UserRole.ADMIN);

    // Create a Cutsomer user
    const responseForCustomer = await store.dispatch(registerUser(customerInfo));
    const newUser: User = responseForCustomer.payload as User;

    expect(newUser.role).toBe(UserRole.CUSTOMER);
    
    // We don't handle the user info
    const { user, error, loading } = store.getState().userReducer;

    expect(user).toBeNull();
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 
  });
});

describe("User reducer with mocking server: Login user", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().userReducer.user).toBeNull();
  }); 

  test("should get user token with the login", async () => {
    await store.dispatch(loginUser(loginInfo));
    const { user, error, loading } = store.getState().userReducer;

    const customerUser: User = {
      ...customerInfo,
      _id: `user_1`,
      role: UserRole.CUSTOMER,
      active: true
    };

    expect(user).toEqual(customerUser);
    expect(error).toBeUndefined();
    expect(loading).toBeFalsy(); 

    // Check token is saved in localStroage
    const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    expect(savedTokens).toEqual(userToken);
  });
});

describe("User reducer with mocking server: Update user", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().userReducer.user).toBeNull();
  }); 

  test("should get updated user", async () => {
    await store.dispatch(loginUser(loginInfo));
    const loggedUser: User | null = store.getState().userReducer.user;

    if (loggedUser) {
      const updateInfo: Partial<RegisterUserInfo> = {
        firstname: 'updatedName'
      }

      await store.dispatch(updateUser(updateInfo));
      const { user, loading, error } = store.getState().userReducer;

      const expectedUser: User = {
        ...loggedUser,
        ...updateInfo
      }

      expect(expectedUser).toEqual(user);
      expect(error).toBeUndefined();
      expect(loading).toBeFalsy(); 
    }
  });
});

describe("User reducer with mocking server: Update userpassword", () => {
  // check init
  test('should return initial state', () => {
    expect(store.getState().userReducer.user).toBeNull();
  }); 

  test("should get update password", async () => {
    // Create a Cutsomer user
    await store.dispatch(loginUser(loginInfo));
    const loggedUser: User | null = store.getState().userReducer.user;

    if (loggedUser) {
      const updateInfo: PasswordUpdate = {
        oldPassword: customerInfo.password,
        newPassword: 'somethingNewPassword'
      };
  
      await store.dispatch(updateUserPassword(updateInfo));
      const { loading, error, user } = store.getState().userReducer;
  
      expect(user?.password).toEqual(updateInfo.newPassword);
      expect(error).toBeUndefined();
      expect(loading).toBeFalsy(); 
    }
  });
});