// mswjs.io
// mocking the server
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { mockProducts } from "../redux/productsReducer.testing";

export const handler = [
  http.get('https://api.escuelajs.co/api/v1/products', ({ request }) => {
    if (request.url.includes('products/')) {
      console.log('with something');
      // return HttpResponse.json(mockProducts[0]);
    }

    return HttpResponse.json(mockProducts);  // fetch all products 
  })
];

export const productServer = setupServer(...handler);