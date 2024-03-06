// mswjs.io
// mocking the server
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockCategories } from "../redux/CategoryReducer.testing";

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/categories', async () => {   
    return HttpResponse.json(mockCategories, { status: 200 });  
  }),
];

export const categoryServer = setupServer(...handler);