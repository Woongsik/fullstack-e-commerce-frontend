import { CartItem, CartItemBase } from "../../misc/types/CartItem";
import { Size } from "../../misc/types/Size";
import { initialState, addToCart, removeFromCart, updateQuantityInCart, clearCart, addToFavorites, removeFromFavorites } from "../../redux/slices/CartSlice";
import CartSliceUtil from "../../redux/utils/CartSliceUtil";
import { mockProducts } from "../shared/ProductServer";
import { createNewStore } from "../../redux/store";

let store = createNewStore();

beforeEach(() => {
  store = createNewStore();
});

const cartItem_1: CartItem = {
  item: mockProducts[0],
  quantity: 1,
  size: Size.Medium
}

const cartItem_2: CartItem = {
  item: mockProducts[1],
  quantity: 1,
  size: Size.OneSize
}

const cartFavorite_1: CartItemBase = {
  item: mockProducts[0],
  quantity: 1
}

const cartFavorite_2: CartItemBase = {
  item: mockProducts[1],
  quantity: 2
}

describe("Cart reducer: Add to cart", () => {
  // inital state
  test("should return initial state", () => {
    const cartState = store.getState().cartReducer;
    expect(cartState).toEqual(initialState);
  });

  test("should return a cart item after adding a cart item", async () => { 
    await store.dispatch(addToCart(cartItem_1));
    const { cartItems, cartFavorites, total, deliveryFee, error } = store.getState().cartReducer;

    // check when add item cart first time
    expect(cartItems).toEqual([cartItem_1]);
    expect(cartFavorites).toEqual([]);
    expect(total).toEqual((cartItem_1.item.price + deliveryFee));
    expect(error).toBeUndefined();
  });

  test("should return a item for adding the same item twice", async () => {    
    await store.dispatch(addToCart(cartItem_1));
    await store.dispatch(addToCart(cartItem_1));

    const { cartItems, cartFavorites, total, deliveryFee, error } = store.getState().cartReducer;

    // check when add item cart first time
    expect(cartItems).toEqual([cartItem_1]);
    expect(cartFavorites).toEqual([]);
    expect(total).toEqual((cartItem_1.item.price + deliveryFee));
    expect(error).toBeUndefined();
  });
});

describe("Cart reducer: Remove from cart", () => {
   test("should return items by removing 1 items", async () => {
    // Adding 2 items to cart
    await store.dispatch(addToCart(cartItem_1));
    await store.dispatch(addToCart(cartItem_2));

    const { cartItems } = store.getState().cartReducer;
    expect(cartItems.length).toBe(2);

    // Remove first item
    await store.dispatch(removeFromCart(cartItem_1));

    const removedCartItems = store.getState().cartReducer.cartItems;
    expect(removedCartItems.length).toBe(1);
  });
});

describe("Cart reducer: Update quantity of cart item", () => {
  test("should update cart item by changing quantity", async () => {
    // Add a cart item
    await store.dispatch(addToCart(cartItem_1));
    let { cartItems, deliveryFee } = store.getState().cartReducer;

    expect(cartItems[0]).toEqual(cartItem_1);

    // Update a cart item with quantity
    const updateItem: CartItem = {
      ...cartItem_1,
      quantity: 2
    }

    await store.dispatch(updateQuantityInCart(updateItem));

    // Check
    const clonedCartItems: CartItem[] = [...cartItems];
    const foundIndex: number = CartSliceUtil.findIndex(cartItems, updateItem);
    let total: number = 0;
    
    if (foundIndex > -1) {
      clonedCartItems.splice(foundIndex, 1, updateItem);
      total = CartSliceUtil.calculateTotal(clonedCartItems, deliveryFee);
    }

    const updatedCartItems: CartItem[] = store.getState().cartReducer.cartItems;
    const updatedTotal = store.getState().cartReducer.total;

    expect(clonedCartItems).toEqual(updatedCartItems);
    expect(total).toEqual(updatedTotal);
  });

  describe("Cart reducer: Clear cart", () => {
    test("should return empty array by clear", async () => {
      // Adding 2 items to cart
      await store.dispatch(addToCart(cartItem_1));
      await store.dispatch(addToCart(cartItem_2));
  
      // Clear
      await store.dispatch(clearCart());

      const { cartItems, total } = store.getState().cartReducer;

      expect(cartItems.length).toBe(0);
      expect(total).toBe(0);
    });
  });

  describe("Cart reducer: Add to favorites", () => {
    test("should return one favorite item", async () => {
      // Adding 1 item to favorite
      await store.dispatch(addToFavorites(cartFavorite_1));
      const { cartItems, total, cartFavorites } = store.getState().cartReducer;

      expect(cartItems.length).toBe(0);
      expect(total).toBe(0);
      expect(cartFavorites.length).toBe(1);
      expect(cartFavorites[0]).toBe(cartFavorite_1);
    });
  });

  describe("Cart reducer: Remove from favorites", () => {
    test("should return one favorite item", async () => {
      // Adding 2 item to favorite
      await store.dispatch(addToFavorites(cartFavorite_1));
      await store.dispatch(addToFavorites(cartFavorite_2));

      const { cartFavorites } = store.getState().cartReducer;

      expect(cartFavorites.length).toBe(2);
      
      // Remove
      await store.dispatch(removeFromFavorites(cartFavorite_1));
      const removedFavorites: CartItemBase[] = store.getState().cartReducer.cartFavorites;
      expect(removedFavorites.length).toBe(1)
      expect(removedFavorites[0]).toEqual(cartFavorite_2);

    });
  });
});