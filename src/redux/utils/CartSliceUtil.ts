import { CartItem, CartItemBase } from "../../misc/types/CartItem";

const findIndex = (cartProducts: CartItem[], cartItem: CartItem): number => {
  const { item } = cartItem;
  return cartProducts.findIndex((cartProduct: CartItem) => cartProduct.item._id === item._id && cartProduct.size === cartItem.size);
}

const checkIfAlreadyAdded = (cartProducts: CartItem[], cartItem: CartItem): boolean => {
  return (findIndex(cartProducts, cartItem) > -1);
}

const findIndexInFavorite = (favorites: CartItemBase[], favorite: CartItemBase): number => {
  const { item } = favorite;
  return favorites.findIndex((cartProduct: CartItemBase) => cartProduct.item._id === item._id);
}

const checkIfAlreadyAddedInFavorite = (favorites: CartItemBase[], item: CartItemBase) => {
  return (findIndexInFavorite(favorites, item) > -1);
}

const calculateTotal = (cartItems: CartItem[], deliveryFee: number): number => {
  if (cartItems && cartItems.length > 0) {
    return cartItems.reduce((acc, cartItem) => {
      acc += (cartItem.item.price * cartItem.quantity);
      return acc;
    }, deliveryFee);
  }

  return 0;
}

export default {
  checkIfAlreadyAdded,
  findIndex,
  findIndexInFavorite,
  checkIfAlreadyAddedInFavorite,
  calculateTotal
}