// import CartItem from "../../misc/types/CartItem";
// import { Product } from "../../misc/types/Product";
// import cartReducer, { initialState, InitialState, addToCart, removeFromCart, updateQuantityInCart } from "../../redux/slices/CartSlice";
// import { mockProducts } from "./ProductsReducer.test";

// describe("Cart reducer: add to cart", () => {
//   // inital state
//   test("should return initial state", () => {
//     const state = cartReducer(undefined, { type: "" });
//     expect(state).toEqual(initialState);
//   });

//   // test: add filter
//   test("should return a cart item by add", () => {
//     const product: Product = mockProducts[0];
//     const cartItem: CartItem = {
//       item: product,
//       quantity: 1 
//     }
//     const state: InitialState = cartReducer(
//       initialState,
//       addToCart(cartItem)
//     );

//     // check when add item cart first time
//     expect(state).toEqual({
//       cartItems: [cartItem],
//       cartFavorites: []
//     });

//     const secondState: InitialState = cartReducer(
//       state,
//       addToCart(cartItem)
//     );

//     // check adding item cart once again! Do not have same item twice
//     expect(secondState).toEqual({
//       cartItems: [cartItem],
//       cartFavorites: []
//     });
//   });
// });

// describe("Cart reducer: remove from cart", () => {
//    // test: remove from filter
//    test("should return items by removing 1 items", () => {
//     const cartItems: CartItem[] = [];
//     mockProducts.forEach((product: Product) => {
//       const cartItem: CartItem = {
//         item: product,
//         quantity: 1
//       }

//       cartItems.push(cartItem);
//     });

//     const state: InitialState = cartReducer(
//       { ...initialState, 
//         cartItems: cartItems
//       },
//       removeFromCart(cartItems[cartItems.length - 1])
//     );

//     cartItems.splice(cartItems.length - 1, 1);

//     // check when remove the item
//     expect(state).toEqual({
//       cartItems: cartItems,
//       cartFavorites: []
//     });

//     // check the cartItems length as well
//     expect(state.cartItems.length).toBe(cartItems.length);

//     // if no product found, do nothing
//     const notExistedProduct: Product = {
//       ...mockProducts[0],
//       id: '-5000'
//     };
//     const notExistedCartItem: CartItem = {
//       item: notExistedProduct,
//       quantity: 1
//     }

//     const secondState: InitialState = cartReducer(
//       state,
//       removeFromCart(notExistedCartItem)
//     );

//     // should be nothing changed from above
//     expect(state).toEqual({
//       cartItems: cartItems,
//       cartFavorites: []
//     });
//   });
// });

// describe("Cart reducer: update quantity of cart item", () => {
//   // test: update quantity
//   test("should update cart item by changing quantity", () => {
//     const cartItem: CartItem = {
//       item: mockProducts[0],
//       quantity: 1
//     }

//     const updatedQuantityCartItem: CartItem = {
//       item: mockProducts[0],
//       quantity: 4
//     }

//     const state: InitialState = cartReducer(
//       { ...initialState, 
//         cartItems: [cartItem]
//       },
//       updateQuantityInCart(updatedQuantityCartItem)
//     );

//     // check item is updated
//     expect(state).toEqual({
//       cartItems: [updatedQuantityCartItem],
//       cartFavorites: []
//     });

//     // check the cartItems length as well
//     expect(state.cartItems[0].quantity).toBe(updatedQuantityCartItem.quantity);
//   });
// })
export const userReducerWithMockingServer = '';