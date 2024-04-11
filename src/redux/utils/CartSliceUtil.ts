import CartItem from "../../misc/types/CartItem";

const findIndex = (cartProducts: CartItem[], cartItem: CartItem): number => {
  const { item } = cartItem;
  return cartProducts.findIndex((cartProduct: CartItem) => cartProduct.item._id === item._id);
}

const checkIfAlreadyAdded = (cartProducts: CartItem[], cartItem: CartItem): boolean => {
  return (findIndex(cartProducts, cartItem) > -1);
}

export default {
  checkIfAlreadyAdded,
  findIndex
}