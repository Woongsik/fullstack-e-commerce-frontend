// mswjs.io
// mocking the server
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { LoginUserInfo, RegisterUserInfo, UserToken } from "../../misc/types/User";
import { registeredInfo, registerInfo, userToken } from "../redux/UserReducer.test";
import { userSlicerUtil } from "../../redux/utils/UserSlicerUtil";
import { mockCategories } from "../redux/CategoryReducer.test";

export const handler = [
  http.post('https://api.escuelajs.co/api/v1/users/', async ({ request }) => { 
    const passedRegisterInfo = await request.json() as RegisterUserInfo;
    if (passedRegisterInfo) { // Checking if the info is passed correctly
      passedRegisterInfo.name === registerInfo.name;
      return HttpResponse.json(null, { status: 200 });
    }

    // User info is passed correctly
    return HttpResponse.json(null, { status: 404 });  
  }),
  http.post('https://api.escuelajs.co/api/v1/auth/login/', async ({ request }) => { 
    const loginInfo = await request.json() as LoginUserInfo;
    if (loginInfo) {
      return HttpResponse.json(userToken, { status: 200 });
    }

    // User info is passed correctly
    return HttpResponse.json(null, { status: 404 });  
  }),
  http.get('https://api.escuelajs.co/api/v1/auth/profile', async ({ request }) => { 
    // Check token is saved in localStroage
    const savedTokens: UserToken | null = userSlicerUtil.getTokensToLocalStorage();
    if (savedTokens && savedTokens.access_token) {
      // User info is passed correctly
      return HttpResponse.json(registeredInfo, { status: 200 }); 
    }

    // if no tokens, then error
    return HttpResponse.json(null, { status: 404 });       
  })
];

export const userServer = setupServer(...handler);