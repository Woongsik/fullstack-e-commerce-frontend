import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { LoggedUserInfo, LoginInfo, PasswordUpdate, RegisterUserInfo, User, UserRole, UserToken } from "../../misc/types/User";
import { userSlicerUtil } from "../../redux/utils/UserSlicerUtil";
import { baseUrl } from "./ServerUtil";
import { customerInfo, store } from "../redux/UserReducerWithMockingServer.test";

export const userToken: UserToken = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
}

export const handler = [
  http.post(`${baseUrl}/api/v1/users/`, async ({ request }) => { 
    const userRegisterInfo: RegisterUserInfo = await request.json() as RegisterUserInfo;
    if (userRegisterInfo) {
      const role: UserRole = userRegisterInfo.email === 'admin@mail.com' ? UserRole.ADMIN : UserRole.CUSTOMER;
      const newUser: User = {
        ...userRegisterInfo,
        _id: `user_1`,
        role: role,
        active: true
      }

      return HttpResponse.json(newUser, { status: 200 });
    }

    return HttpResponse.json(null, { status: 404 });  
  }),
  http.put(`${baseUrl}/api/v1/users/`, async ({ request }) => { 
    const user: User | null = store.getState().userReducer.user;
    if (user) {
      const updateInfo: Partial<User> = await request.json() as Partial<User>;
      if (updateInfo) {
        const updatedUser: User = {
          ...user,
          ...updateInfo
        }
  
        return HttpResponse.json(updatedUser, { status: 201 });
      }
    }
    
    return HttpResponse.json(null, { status: 404 });  
  }),
  http.put(`${baseUrl}/api/v1/users/update-password`, async ({ request }) => { 
    const user: User | null = store.getState().userReducer.user;
    const passwordInfo: PasswordUpdate = await request.json() as PasswordUpdate;
    if (user && passwordInfo) {
      if (user.password === passwordInfo.oldPassword) {
        const updatedUser: User = {
          ...user,
          password: passwordInfo.newPassword
        }

        return HttpResponse.json(updatedUser, { status: 201});    
      }

      return HttpResponse.json(null, { status: 400 }); // password not matched      
    }

    return HttpResponse.json(null, { status: 404 });       
  }),
  http.post(`${baseUrl}/api/v1/users/login`, async ({ request }) => { 
    const loginInfo = await request.json() as LoginInfo;
    if (loginInfo) {
      const customerUser: User = {
        ...customerInfo,
        _id: `user_1`,
        role: UserRole.CUSTOMER,
        active: true
      }

      const loggeduserInfo: LoggedUserInfo = {
        user: customerUser,
        tokens: userToken
      }

      return HttpResponse.json(loggeduserInfo, { status: 200 });
    }

    return HttpResponse.json(null, { status: 404 });  
  })
];

export const userServer = setupServer(...handler);