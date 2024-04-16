import { Product } from "./Product";
import { Size } from "./Size";

export type CartItemBase = {
  item: Product;
  quantity: number;
}

export type CartItem = CartItemBase & {
  size: Size;
}