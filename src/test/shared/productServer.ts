// mswjs.io
// mocking the server
// import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// import { mockProducts } from "../redux/productsReducer.test";

// export const handler = [
//   http.get('https://api.escuelajs.co/api/v1/products', () => {   
//     return HttpResponse.json(mockProducts, { status: 200 });
//   }),
//   http.post('https://api.escuelajs.co/api/v1/products', ({request}) => {
//     const product = request.body;
//     return HttpResponse.json(product, { status: 200 })
//   })
// ];

//export const productServer = setupServer(...handler);
export const productServer = setupServer();
